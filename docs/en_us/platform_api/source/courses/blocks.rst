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

*******************************************************
Get a List of Course Blocks in a Specified Course
*******************************************************

The endpoint to get a list of course blocks in a specified block tree
``/api/courses/v1/blocks/?course_id=<course_id>``.

=====================
Use Case
=====================

Get a list of course blocks in a specified course. Response results depend on
the requesting user's access level.

=====================
Example Request
=====================

GET /api/courses/v1/blocks/?course_id=<course_id>
    &username=anjali
    &depth=all
    &requested_fields=graded,format,student_view_multi_device,lti_url
    &block_counts=video
    &student_view_data=video
    &block_types_filter=problem,html

=====================
Parameters
=====================

This view redirects to /api/courses/v1/blocks/<root_usage_key>/ for the root
block usage key of the course specified by course_id.

This view accepts the following parameters.

* block_counts: to return the aggregate number of blocks (including child
  blocks) of each type specified in the "block_counts" response value.
  Example: block_counts=video,problem

* block_types_filter: Specify the types of blocks to be included in results.
  Possible values are: ``sequential``, ``vertical``, ``html``, ``problem``,
  ``video``   and ``discussion``.

* course_id: (string, required) The ID of the course whose block data you are
  requesting.

* depth: (integer or ``all``) Specify how far down in the course blocks
  hierarchy to traverse down. A value of ``all`` specifies the entire
  hierarchy. The default value is 0.

* requested_fields: (list) Indicates fields to return for each block, in
  addition to id, type, and display_name, which are always returned. For the
  list of possible fields, see the fields listed under ``blocks`` in the
  **Response Values** section below.

* return_type: (string) Indicates in what data type to return the block data.
  Supported values are ``dict`` and ``list``. The default value is ``dict``.

* student_view_data: (list) Indicates for which block types the JSON data is
  returned in the "student_view_data" response value. Example:
  student_view_data=video

* username: (string) Required, unless ``all_blocks`` is specified. Example:
  username=anjali


=====================
Response Values
=====================

The following fields are returned with a successful response.

* root: The ID of the root node of the requested course block structure.

* blocks: A dictionary that maps block usage IDs to a collection of information
  about each block. Each block contains the following fields.

  * id: (string) The usage ID of the block.

  * type: (string) The type of block. Possible values include course, chapter,
    sequential, vertical, html, problem, video, and discussion. The type can
    also be the name of a custom type of block.

  * display_name: (string) The display name of the block.

  * children: (list) If the block has child blocks, a list of IDs of the child
    blocks. Returned only if "children" is included in the "requested_fields"
    parameter.

  * block_counts: (dict) For each block type specified in the block_counts
    parameter to the endpoint, the aggregate number of blocks of that type for
    this block and all of its descendants. Returned only if the "block_counts"
    input parameter contains this block's type.

  * graded (boolean) Whether or not the block or any of its descendants is
    graded. Returned only if "graded" is included in the "requested_fields"
    parameter.

  * format: (string) The assignment type of the block. Possible values can be
    "Homework", "Lab", "Midterm Exam", and "Final Exam". Returned only if
    "format" is included in the "requested_fields" parameter.

  * student_view_data: (dict) The JSON data for this block. Returned only if the
    "student_view_data" input parameter contains this block's type.

  * student_view_url: (string) The URL to retrieve the HTML rendering of this
    block's student view. The HTML can include CSS and Javascript code. This
    field can be used in combination with the ``student_view_multi_device``
    field to decide whether to display this content to the user. This URL can
    be used as a fallback if the ``student_view_data`` for this block type is
    not supported by the client or by the block.

  * student_view_multi_device: (boolean) Whether or not the block's rendering
    obtained via block_url has support for multiple devices. Returned only if
    "student_view_multi_device" is included in the "requested_fields"
    parameter.

  * lms_web_url: (string) The URL to the navigational container of the xBlock
    on the web LMS. This URL can be used as a further fallback if the
    student_view_url and the student_view_data fields are not supported.

  * lti_url: The block URL for an LTI consumer.


================
Return Values
================

* 200 on success with above fields.

* 400: Bad Request for the following error conditions.

  * If ``course_id`` is not provided
  * If the provided ``course_id`` is invalid
  * If ``username`` is not provided in cases other than ``all_blocks``
    requested.

* 404: If the specified block is not found.


============================================================================
Example Response Showing a List of Course Blocks in a Specified Course
============================================================================

::

 {
    "root": "block-v1:MITx+0.111x+2T2015+type@course+block@course",
    "blocks": {
        "block-v1:MITx+0.111x+2T2015+type@course+block@course":
                 {
            "display_name": "Making Science and Engineering Pictures: A Practical Guide to Presenting Your Work",
            "lms_web_url": "https://courses.edx.org/courses/course-v1:MITx+0.111x+2T2015/jump_to/block-v1:MITx+0.111x+2T2015+type@course+block@course",
            "type": "course",
            "id": "block-v1:MITx+0.111x+2T2015+type@course+block@course",
            "student_view_url": "https://courses.edx.org/xblock/block-v1:MITx+0.111x+2T2015+type@course+block@course"
                 }
              }
 }


.. _Get a list of the course blocks in a block tree:

*******************************************************
Get a List of Course Blocks in a Specified Block Tree
*******************************************************

The endpoint to get a list of course blocks in a specified block tree
``/api/courses/v1/blocks/<usage_id>/``.

=====================
Use Case
=====================

Get a list of course blocks in a specified block tree. Response results depend
on the requesting user's access level.

=====================
Example Request
=====================

GET /api/courses/v1/blocks/<usage_id>/?
    username=anjali
    &depth=all
    &requested_fields=graded,format,student_view_multi_device,lti_url
    &block_counts=video
    &student_view_data=video
    &block_types_filter=problem,html

=====================
Parameters
=====================

This view accepts the following parameters.

* block_counts: to return the aggregate number of blocks (including child
  blocks) of each type specified in the "block_counts" response value.
  Example: block_counts=video,problem

* block_types_filter: Specify the types of blocks to be included in results.
  Possible values are: ``sequential``, ``vertical``, ``html``, ``problem``,
  ``video``   and ``discussion``.

* course_id: (string, required) The ID of the course whose block data you are
  requesting.

* depth: (integer or ``all``) Specify how far down in the course blocks
  hierarchy to traverse down. A value of ``all`` specifies the entire
  hierarchy. The default value is 0.

* requested_fields: (list) Indicates fields to return for each block, in
  addition to id, type, and display_name, which are always returned. For the
  list of possible fields, see the fields listed under ``blocks`` in the
  **Response Values** section below.

* return_type: (string) Indicates in what data type to return the block data.
  Supported values are ``dict`` and ``list``. The default value is ``dict``.

* student_view_data: (list) Indicates for which block types the JSON data is
  returned in the "student_view_data" response value. Example:
  student_view_data=video

* username: (string) Required, unless ``all_blocks`` is specified. Example:
  username=anjali

=====================
Response Values
=====================

The following fields are returned with a successful response.

* root: The ID of the root node of the requested course block structure.

* blocks: A dictionary that maps block usage IDs to a collection of information
  about each block. Each block contains the following fields.

  * id: (string) The usage key of the block.

  * type: (string) The type of block. Possible values include course, chapter,
    sequential, vertical, html, problem, video, and discussion. The type can
    also be the name of a custom type of block.

  * display_name: (string) The display name of the block.

  * children: (list) If the block has child blocks, a list of IDs of the child
    blocks. Returned only if "children" is included in the "requested_fields"
    parameter.

  * block_counts: (dict) For each block type specified in the block_counts
    parameter to the endpoint, the aggregate number of blocks of that type for
    this block and all of its descendants. Returned only if the "block_counts"
    input parameter contains this block's type.

  * graded (boolean) Whether or not the block or any of its descendants is
    graded. Returned only if "graded" is included in the "requested_fields"
    parameter.

  * format: (string) The assignment type of the block.  Possible values can be
    "Homework", "Lab", "Midterm Exam", and "Final Exam". Returned only if
    "format" is included in the "requested_fields" parameter.

  * student_view_data: (dict) The JSON data for this block. Returned only if the
    "student_view_data" input parameter contains this block's type.

  * student_view_url: (string) The URL to retrieve the HTML rendering of this
    block's student view.  The HTML could include CSS and Javascript code.
    This field can be used in combination with the student_view_multi_device
    field to decide whether to display this content to the user.
    This URL can be used as a fallback if the student_view_data for this block
    type is not supported by the client or by the block.

  * student_view_multi_device: (boolean) Whether or not the block's rendering
    obtained via block_url has support for multiple devices. Returned only if
    "student_view_multi_device" is included in the "requested_fields"
    parameter.

  * lms_web_url: (string) The URL to the navigational container of the xBlock
    on the web LMS. This URL can be used as a further fallback if the
    student_view_url and the student_view_data fields are not supported.

  * lti_url: The block URL for an LTI consumer.


================
Return Values
================

* 200 on success with above fields.

* 404 if the specified block is not found.


============================================================================
Example Response Showing a List of Course Blocks in a Specified Block Tree
============================================================================


