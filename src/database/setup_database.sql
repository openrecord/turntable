DROP DATABASE IF EXISTS openrecord;
DROP DATABASE IF EXISTS openrecord_test;
CREATE DATABASE openrecord DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE DATABASE openrecord_test DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

GRANT ALL ON openrecord.* to 'dev'@'%' IDENTIFIED BY 'anByU=9c77?cD26k';
GRANT ALL ON openrecord_test.* to 'dev'@'%' IDENTIFIED BY 'anByU=9c77?cD26k';
GRANT ALL ON openrecord_test.* to 'unittest'@'%' IDENTIFIED BY 'dfsoio90fv0$dd';
FLUSH PRIVILEGES;