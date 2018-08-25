from rest_framework.pagination import CursorPagination

class NotesTimelinePagination(CursorPagination):
    page_size = 10
    cursor_query_param = 'id'
    ordering = 'created_at'