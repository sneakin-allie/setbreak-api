module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://allison_schulman@localhost/concerts',
    TEST_DB_URL: process.env.DB_URL || 'postgresql://allison_schulman@localhost/concerts'
}