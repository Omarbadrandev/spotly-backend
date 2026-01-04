-- Rename columns from camelCase to snake_case
ALTER TABLE "parking_spots"
RENAME COLUMN "createdAt" TO "created_at";

ALTER TABLE "parking_spots"
RENAME COLUMN "updatedAt" TO "updated_at";