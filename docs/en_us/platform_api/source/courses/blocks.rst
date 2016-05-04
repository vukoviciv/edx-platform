.. _Courses API Blocks Resource:

########################################
Courses API Blocks Resource
########################################

With the Courses API **Blocks** resource, you can complete the
following tasks.


.. contents::
   :local:
   :depth: 1

.. _Get a list of the course blocks in a course:

****************************************
Get a List of Course Blocks in a Course
****************************************

The endpoint to get a list of course blocks in a course is
``/api/courses/v1/blocks/`` with required ``course_id`` parameter.

=====================
Use Case
=====================

Get a list of course blocks in a specified course. Response results depend on
the requesting user's access level.

=====================
Example Requests
=====================

GET /api/courses/v1/blocks/?course_id=<course_id>

GET /api/courses/v1/blocks/?course_id=edX%2FDemoX%2FDemo_Course
&all_blocks=true&requested_fields=graded,format,student_view_multi_device

=====================
Query Parameters
=====================

* all_blocks: (boolean) Provide a value of ``true`` to return all blocks.

* block_counts: (list) Specify the types of blocks for which to return a count
  of that type (including child blocks). Example: ``block_counts=video,problem``.

* block_types_filter: (list) Specify the types of blocks to be included in results.
  Possible values are: ``sequential``, ``vertical``, ``html``, ``problem``,
  ``video`` and ``discussion``. Example: ``block_types_filter=problem,html``.

* course_id: (string, required) The URL-encoded ID of the course whose block
  data you are requesting. Example: ``course_id=edX%2FDemoX%2FDemo_Course``.

* depth: (integer or ``all``) Specify how far in the course blocks hierarchy
  to traverse down. A value of ``all`` specifies the entire hierarchy. The
  default value is ``0``. Example: ``depth=all``.

* requested_fields: (list) Specify the fields to return for each block, in
  addition to ID, type, and display_name, which are always returned. For the
  list of possible fields, see the fields listed under ``blocks`` in the
  **Response Values** section below. Example:
  ``requested_fields=graded,format,student_view_multi_device``.

* return_type: (string) Specify the data type in which the block data is
  returned. Supported values are ``dict`` and ``list``. The default value is
  ``dict``.

* student_view_data: (list) Specify for which block types the JSON data is
  returned in the "student_view_data" response value. Example:
  ``student_view_data=video``.

* username: (string) Required, unless ``all_blocks`` is specified. Example:
  ``username=anjali``.


=====================
Response Values
=====================

The following fields are returned with a successful response.

* root: The ID of the root node of the requested course block structure.

* blocks: A dictionary that maps block usage IDs to a collection of information
  about each block. Each block contains the following fields.

  * id: (string) The usage ID of the block.

  * type: (string) The type of block. Possible values include ``course``,
    ``chapter``, ``sequential``, ``vertical``, ``html``, ``problem``,
    ``video``, and ``discussion``. The type can also be the name of a custom
    type of block.

  * display_name: (string) The display name of the block.

  * children: (list) If the block has child blocks, a list of IDs of the child
    blocks. Returned only if ``children`` is included in the ``requested_fields``
    query parameter.

  * block_counts: (dict) For each block type specified in the ``block_counts``
    parameter to the endpoint, the aggregate number of blocks of that type for
    this block and all of its descendants. Returned only if the ``block_counts``
    query parameter contains this block's type.

  * graded: (boolean) Whether or not the block or any of its descendants is
    graded. Returned only if ``graded`` is included in the ``requested_fields``
    query parameter.

  * format: (string) The assignment type of the block. Possible values can be
    ``Homework``, ``Lab``, ``Midterm Exam``, and ``Final Exam``. Returned only if
    ``format`` is included in the ``requested_fields`` query parameter.

  * student_view_data: (dict) The JSON data for this block. Returned only if the
    ``student_view_data`` query parameter contains this block's type.

  * student_view_url: (string) The URL to retrieve the HTML rendering of this
    block's student view. The HTML can include CSS and Javascript code. This
    field can be used in combination with the ``student_view_multi_device``
    field to determine whether a block can be viewed on a device. This URL can
    be used as a fallback if the ``student_view_data`` for this block type is
    not supported by the client or by the block.

  * student_view_multi_device: (boolean) Whether or not the block whose URL is
    indicated in ``block_url`` can be viewed on mobile devices. Returned only
    if ``student_view_multi_device`` is included in the ``requested_fields``
    query parameter.

  * lms_web_url: (string) The URL to the navigational container of the XBlock
    on the web LMS. This URL can be used as a fallback if the
    ``student_view_url`` and the ``student_view_data`` fields are not
    supported.

  * lti_url: (string) The block URL for an LTI consumer.


============================================================================
Example Response Showing a List of Course Blocks in a Specified Course
============================================================================

.. code-block:: json

 {
   "root": "i4x://edX/DemoX/course/Demo_Course",
   "blocks": {
      "i4x://edX/DemoX/course/Demo_Course": {
        "display_name": "edX Demonstration Course",
        "graded": false,
        "student_view_url": "https://courses.edx.org/xblock/i4x://edX/DemoX/
         course/Demo_Course",
        "student_view_multi_device": false,
        "lms_web_url": "https://courses.edx.org/courses/edX/DemoX/Demo_Course/
          jump_to/i4x://edX/DemoX/course/Demo_Course",
        "type": "course",
        "id": "i4x://edX/DemoX/course/Demo_Course"
        }
    }
 }


.. _Get a list of the course blocks in a block tree:

*********************************************
Get a List of Course Blocks in a Block Tree
*********************************************

The endpoint to get a list of course blocks in a specified block tree is
``/api/courses/v1/blocks/{usage_id}/``.

=====================
Use Case
=====================

Get a list of course blocks in a specified block tree. Response results depend
on the requesting user's access level.

=====================
Example Requests
=====================

GET /api/courses/v1/blocks/{usage_id}/

GET /api/courses/v1/blocks/i4x%3A%2F%2FedX%2FDemoX%2Fvertical
%2F2152d4a4aadc4cb0af5256394a3d1fc7?all_blocks=true


=====================
Query Parameters
=====================

* all_blocks: (boolean) Provide a value of ``true`` to return all blocks.

* block_counts: to return the aggregate number of blocks (including child
  blocks) of each type specified in the "block_counts" response value.
  Example: ``block_counts=video,problem``.

* block_types_filter: Specify the types of blocks to be included in results.
  Possible values are: ``sequential``, ``vertical``, ``html``, ``problem``,
  ``video``   and ``discussion``. Example: ``block_types_filter=problem,html``.

* depth: (integer or ``all``) Specify how far in the course blocks hierarchy
  to traverse down. A value of ``all`` specifies the entire hierarchy. The
  default value is ``0``. Example: ``depth=all``.

* requested_fields: (list) Indicates fields to return for each block, in
  addition to id, type, and display_name, which are always returned. For the
  list of possible fields, see the fields listed under ``blocks`` in the
  **Response Values** section below. Example:
  ``requested_fields=graded,format,student_view_multi_device``.

* return_type: (string) Indicates in what data type to return the block data.
  Supported values are ``dict`` and ``list``. The default value is ``dict``.

* student_view_data: (list) Indicates for which block types the JSON data is
  returned in the "student_view_data" response value. Example:
  ``student_view_data=video``.

* usage_id: (string) The usage ID of the block. Example: ``i4x%3A%2F%2FedX
  %2FDemoX%2Fvertical%2F2152d4a4aadc4cb0af5256394a3d1fc7?all_blocks=true``

* username: (string) Required, unless ``all_blocks`` is specified. Example:
  ``username=anjali``.


=====================
Response Values
=====================

The following fields are returned with a successful response.

* root: The ID of the root node of the requested course block structure.

* blocks: A dictionary that maps block usage IDs to a collection of information
  about each block. Each block contains the following fields.

  * id: (string) The usage ID of the block.

  * type: (string) The type of block. Possible values include ``course``,
    ``chapter``, ``sequential``, ``vertical``, ``html``, ``problem``,
    ``video``, and ``discussion``. The type can also be the name of a custom
    type of block.

  * display_name: (string) The display name of the block.

  * children: (list) If the block has child blocks, a list of IDs of the child
    blocks. Returned only if ``children`` is included in the ``requested_fields``
    query parameter.

  * block_counts: (dict) For each block type specified in the ``block_counts``
    parameter to the endpoint, the aggregate number of blocks of that type for
    this block and all of its descendants. Returned only if the ``block_counts``
    query parameter contains this block's type.

  * graded: (boolean) Whether or not the block or any of its descendants is
    graded. Returned only if ``graded`` is included in the ``requested_fields``
    query parameter.

  * format: (string) The assignment type of the block. Possible values can be
    ``Homework``, ``Lab``, ``Midterm Exam``, and ``Final Exam``. Returned only if
    ``format`` is included in the ``requested_fields`` query parameter.

  * student_view_data: (dict) The JSON data for this block. Returned only if the
    ``student_view_data`` query parameter contains this block's type.

  * student_view_url: (string) The URL to retrieve the HTML rendering of this
    block's student view. The HTML can include CSS and Javascript code. This
    field can be used in combination with the ``student_view_multi_device``
    field to determine whether a block can be viewed on a device. This URL can
    be used as a fallback if the ``student_view_data`` for this block type is
    not supported by the client or by the block.

  * student_view_multi_device: (boolean) Whether or not the block whose URL is
    indicated in ``block_url`` can be viewed on mobile devices. Returned only
    if ``student_view_multi_device`` is included in the ``requested_fields``
    query parameter.

  * lms_web_url: (string) The URL to the navigational container of the XBlock
    on the web LMS. This URL can be used as a fallback if the
    ``student_view_url`` and the ``student_view_data`` fields are not
    supported.

  * lti_url: (string) The block URL for an LTI consumer.


================================================================
Example Response Showing a List of Course Blocks in a Block Tree
================================================================

.. code-block:: json

 {
   "root": "i4x://edX/DemoX/vertical/2152d4a4aadc4cb0af5256394a3d1fc7",
   "blocks": {
      "i4x://edX/DemoX/discussion/e5eac7e1a5a24f5fa7ed77bb6d136591": {
         "display_name": "",
         "lms_web_url": "https://courses.edx.org/courses/edX/DemoX/Demo_Course/
          jump_to/i4x://edX/DemoX/discussion/e5eac7e1a5a24f5fa7ed77bb6d136591",
         "type": "discussion",
         "id": "i4x://edX/DemoX/discussion/e5eac7e1a5a24f5fa7ed77bb6d136591",
         "student_view_url": "https://courses.edx.org/xblock/i4x://edX/DemoX/
          discussion/e5eac7e1a5a24f5fa7ed77bb6d136591"
     },
      "i4x://edX/DemoX/vertical/2152d4a4aadc4cb0af5256394a3d1fc7": {
         "display_name": "Pointing on a Picture",
         "lms_web_url": "https://courses.edx.org/courses/edX/DemoX/Demo_Course/
          jump_to/i4x://edX/DemoX/vertical/2152d4a4aadc4cb0af5256394a3d1fc7",
         "type": "vertical",
         "id": "i4x://edX/DemoX/vertical/2152d4a4aadc4cb0af5256394a3d1fc7",
         "student_view_url": "https://courses.edx.org/xblock/i4x://edX/DemoX/
          vertical/2152d4a4aadc4cb0af5256394a3d1fc7"
     },
      "i4x://edX/DemoX/problem/c554538a57664fac80783b99d9d6da7c": {
         "display_name": "Pointing on a Picture",
         "lms_web_url": "https://courses.edx.org/courses/edX/DemoX/Demo_Course/
          jump_to/i4x://edX/DemoX/problem/c554538a57664fac80783b99d9d6da7c",
         "type": "problem",
         "id": "i4x://edX/DemoX/problem/c554538a57664fac80783b99d9d6da7c",
         "student_view_url": "https://courses.edx.org/xblock/i4x://edX/DemoX/
          problem/c554538a57664fac80783b99d9d6da7c"
     }
   }
 }
