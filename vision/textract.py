import boto3
from fastapi import UploadFile
import logging
from botocore.exceptions import ClientError

logger = logging.getLogger(__name__)

def detect_file_text(document_file: UploadFile):
        textract_client = boto3.client('textract')
        """
        Detects text elements in a local image file or from in-memory byte data.
        The image must be in PNG or JPG format.

        :param document_file_name: The name of a document image file.
        :param document_bytes: In-memory byte data of a document image.
        :return: The response from Amazon Textract, including a list of blocks
                 that describe elements detected in the image.
        """
        if document_file is not None:
                document_bytes = document_file.file.read()

        response = textract_client.detect_document_text(
            Document={"Bytes": document_bytes}
        )
        # Loop through blocks and extract text
        text = ""
        blocks = response['Blocks']
        for block in blocks:
            if block['BlockType'] == "LINE":
                text += block["Text"] + "\n"  # Add newline for each line

        return text

