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