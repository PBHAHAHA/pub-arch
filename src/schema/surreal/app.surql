-- CREATE  starup  CONTENT {
--     name: "冰雨2",
--     oneline: "创建初创"
-- };


DEFINE FIELD created ON starup VALUE $before OR $value OR time::now() ;
DEFINE FIELD updated ON starup VALUE time::now() ;
DEFINE INDEX slugIndex ON starup FIELDS slug UNIQUE;
DEFINE EVENT starupUpdated ON TABLE starup WHEN $event == 'UPDATE' THEN {
    CREATE event CONTENT {
        name: 'starupUpdated',
        created: time::now(),
        tartget: $after.id,
        data: $after.name
    }
};

-- ------------------------------
-- TABLE: user
-- ------------------------------
DEFINE INDEX nameIndex ON user FIELDS name UNIQUE ;
DEFINE INDEX mobileIndex ON user FIELDS mobile UNIQUE;
DEFINE INDEX emailIndex ON user FIELDS email UNIQUE;

-- ------------------------------
-- TABLE: verification
-- ------------------------------
DEFINE FIELD created ON verification VALUE $before OR $value OR time::now();