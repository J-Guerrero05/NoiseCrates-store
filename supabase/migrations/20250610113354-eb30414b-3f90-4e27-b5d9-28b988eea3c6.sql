
-- Fix the purchased_packs table to have the correct foreign key relationship
-- First, drop the existing column if it exists
ALTER TABLE purchased_packs DROP COLUMN IF EXISTS pack_id;

-- Ensure the sample_pack_id column exists and has the correct foreign key constraint
ALTER TABLE purchased_packs DROP CONSTRAINT IF EXISTS fk_sample_pack_id;

-- Add the foreign key constraint to link to sample_packs table
ALTER TABLE purchased_packs ADD CONSTRAINT fk_sample_pack_id 
FOREIGN KEY (sample_pack_id) REFERENCES sample_packs(id) ON DELETE CASCADE;

-- Add an index for better performance
CREATE INDEX IF NOT EXISTS idx_purchased_packs_sample_pack_id ON purchased_packs(sample_pack_id);
CREATE INDEX IF NOT EXISTS idx_purchased_packs_user_id ON purchased_packs(user_id);
