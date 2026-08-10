from typing import Annotated, Any
from bson import ObjectId
from pydantic import GetCoreSchemaHandler
from pydantic_core import core_schema

class PyObjectId(str):
    """
    Custom Pydantic type helper for MongoDB BSON ObjectId serialization.
    Student Note:
    MongoDB generates `_id` as BSON ObjectIds (e.g. ObjectId("65f123...")).
    This helper converts BSON ObjectIds into standard JSON strings when sending
    responses to the Next.js frontend, and validates string IDs on incoming requests.
    """
    @classmethod
    def __get_pydantic_core_schema__(
        cls, _source_type: Any, _handler: GetCoreSchemaHandler
    ) -> core_schema.CoreSchema:
        return core_schema.json_or_python_schema(
            json_schema=core_schema.str_schema(),
            python_schema=core_schema.union_schema([
                core_schema.is_instance_schema(ObjectId),
                core_schema.str_schema(),
            ]),
            serialization=core_schema.plain_serializer_function_ser_schema(
                lambda x: str(x) if isinstance(x, ObjectId) else x
            ),
        )
