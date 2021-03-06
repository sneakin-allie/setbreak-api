module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || `development`,
    DATABASE_URL: process.env.DATABASE_URL || `postgresql://allison_schulman@localhost/concerts`,
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || `postgresql://allison_schulman@localhost/concerts_test`,
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL || `https://mighty-reef-98621.herokuapp.com/`
};