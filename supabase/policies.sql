DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE policyname = 'Enable update for authenticated users only'
      AND tablename = 'updates'
  ) THEN
    CREATE POLICY "Enable update for authenticated users only"
    ON public.updates
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);
  END IF;
END $$;
