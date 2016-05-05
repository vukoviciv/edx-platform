# pylint: disable=missing-docstring
import logging

from django.conf import settings
from django.core.management import BaseCommand
from django.db.models import Q
from opaque_keys.edx.keys import CourseKey
from provider.oauth2.models import Client

from certificates.models import GeneratedCertificate
from openedx.core.djangoapps.programs.models import ProgramsApiConfig
from openedx.core.djangoapps.programs.tasks.v1.tasks import award_program_certificates
from openedx.core.djangoapps.programs.utils import get_programs


logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = 'Backfill programs certificates.'

    def add_arguments(self, parser):
        parser.add_argument(
            '-c', '--commit',
            action='store_true',
            dest='commit',
            default=False,
            help='Submit tasks for processing.'
        )

    def handle(self, *args, **options):
        commit = options.get('commit')

        programs_config = ProgramsApiConfig.current()
        client = Client.objects.get(name=programs_config.OAUTH2_CLIENT_NAME)

        if client.user is None:
            pass
        else:
            programs = get_programs(client.user)

        run_modes = []
        for program in programs:
            for course_code in program['course_codes']:
                for run in course_code['run_modes']:
                    run_modes.append(
                        (CourseKey.from_string(run['course_key']), run['mode_slug'])
                    )

        query = reduce(lambda x, y: x | y, [Q(course_id=r[0], mode=r[1]) for r in run_modes])
        # Lists of dicts of the form [{'user__username': u'staff'}, {'user__username': u'verified'}]
        usernames = GeneratedCertificate.eligible_certificates.filter(query).values('user__username').distinct()
