# 20220811Prj
# cse811
Final Project

Data: friends.csv, persons.csv 

Start neo4j, Upload files in neo4j. Select copy url to clipboard option and run below commands

LOAD CSV WITH HEADERS FROM "http://localhost:11001/project-ed575546-44f3-4e87-90d0-df78dad920de/persons.csv" AS line
MERGE (a:Person{id:line.id,state:line.state})
ON CREATE SET a.name=line.name;

LOAD CSV WITH HEADERS FROM "http://localhost:11001/project-ed575546-44f3-4e87-90d0-df78dad920de/friends.csv" AS line
MATCH (a:Person { id: line.personId}),(b:Person {id: line.friendId})
CREATE (a)-[:FRIENDS_SINCE { year: toInteger(line.year)}]->(b);

Replace the URL with your localhost/directory
