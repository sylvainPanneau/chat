create table messages(
    id int primary key,
    author varchar(50) unique not null, 
    body text
);

update messages
set body='slt'
where author='moi';