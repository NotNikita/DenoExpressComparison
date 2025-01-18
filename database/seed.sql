CREATE TABLE IF NOT EXISTS public.deno_cars (
    id UUID PRIMARY KEY,
    producer VARCHAR(50),
    year INT
);
CREATE TABLE IF NOT EXISTS public.express_cars (
    id UUID PRIMARY KEY,
    producer VARCHAR(50),
    year INT
);