#!/bin/bash
# Script to fetch OpenAPI spec from a running server

PORT=${PORT:-3000}
OUTPUT_FILE=${OUTPUT_FILE:-openapi.json}
URL="http://localhost:${PORT}/api/docs-json"

echo "Checking if server is running on port ${PORT}..."
if ! curl -s -f "${URL}" > /dev/null 2>&1; then
  echo "❌ Error: Server is not running on port ${PORT}"
  echo ""
  echo "Please start the server first:"
  echo "  pnpm run serve"
  echo ""
  echo "Then run this command again in another terminal."
  exit 1
fi

echo "Fetching OpenAPI spec from ${URL}..."
if curl -s -f "${URL}" > "${OUTPUT_FILE}"; then
  # Check if file is not empty
  if [ -s "${OUTPUT_FILE}" ]; then
    echo "✅ OpenAPI spec saved to ${OUTPUT_FILE}"
    echo "   File size: $(wc -c < "${OUTPUT_FILE}" | xargs) bytes"
  else
    echo "❌ Error: Received empty response from server"
    rm -f "${OUTPUT_FILE}"
    exit 1
  fi
else
  echo "❌ Error: Failed to fetch OpenAPI spec"
  rm -f "${OUTPUT_FILE}"
  exit 1
fi

