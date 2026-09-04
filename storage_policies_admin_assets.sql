-- 1. INSERT: upload para admin
CREATE POLICY "admin_assets_insert_admin"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'admin-assets'
  AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

-- 2. UPDATE: substituir logo
CREATE POLICY "admin_assets_update_admin"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'admin-assets'
  AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
)
WITH CHECK (
  bucket_id = 'admin-assets'
  AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

-- 3. DELETE: remover logo
CREATE POLICY "admin_assets_delete_admin"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'admin-assets'
  AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);