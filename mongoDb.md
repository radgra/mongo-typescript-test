# Udemy - Mongo Course by Schwarzmueller

### Section 3 - Schemas and Relations
- Db jest tworzona on demand automatycznie
- Mongo jest Schemaless
- Core Fields + extra data
- On uwaza ze uzywana jest full schema albo middle ground
- Schemaless nie mylic z relations - to pojecie oznacza ze mona miec inne fieldy na dokumencie w tej samej kolekcji
- Dodatkwo mozna miec nested documents i arrays

#### Data Types
- Mongo ma datatypes - text, boolean, number, (integer, numberlong,numberdecimal, objectId, isoDate, Timestamp, embeddedDocument)
- db.stats() - pokazuje statystyki w database
- deleteMany({}) <---- kasuje wszystko w raw driver
- db shell ma komende typeof - ktora umozliwia sprawdzienie typu propoerty na objekcie
- planinng structure based on how you retrieve data
- how ofen do i fetch data ?
- do i have to change data - np orders - often, products data - rarely - that decided on normalization/denormalization
- sposoby przechowywania danych:
    a) nested documents
    b) references
- mozna unique forcowac za pomoca id
- 16mb limit on document -> to jest wazny aspekt ktory powinien byc brany pod uwage przy designie

### Data Modeling -> sprobowac kazdy pattern w node typescript mongo app !!
- one to one embedded ---> better when strong relation - on twierdzi ze w wiekszosci wypadkow bedziemy stosowac to rozwiazanie
- one to one references ---> kiedy relacja nie jest tak istotna w applikacji -> istnieje ale nie jest wazna
- one to many embedded ---> podaje przyklad question->answers 
- one to many ref ---> jeden extra request przyklad city->citizens - 16mb limit bedzie osiagniety, przklad jest bez reverse Refernce Id na one side -> sprobowac tez takie           rozwiazanie --> I POZNAC JEGO POZYTYWY I NEGATYWY -> to w przyszlym tygodniu
- many to many - embedded -> customer -> product , tworzy intermediary table orders ktora zawiera produktId i customerId jako zly przyklad, zamiast tegi decyduje sie na jedna
    kolekcje w tym wypadku customers i tam umiezszcza embedded orders 
    -   w tej embedded kolekcji dodaje foreign key do product, mozna tez zapewne pelny opis produktu zastosowac
    mowi zeby sie nie martwic jak nazwa produktu na order nie bedzie aktualne - to nie jest duzy problem. Czasami brak consistency jest ok.
- refernces - wtedy kiedy dane sie czesto zmieniaja
- co ciekawe nie rozwaza sytuacji kiedy wszystko sie pakuje do jednej kolekcji np books collection i kazdy ksiaka ma autora - czy tak mozna ? czy wtedy nie bedzie zadnych problemow???? -> co jesli checmy querowac:
    a) wszystkich autorow?
    b) ksiazki ktore sa przypisane do autora ?
    c) czy problem dotyczy tylko writeow ?

- $lookup operator -> customers.aggregate([{$lookup:{from:"books", localField:"favBooks", foreignField:"_id", as:"favBookData"}}])
 
- Schema validation !! istnieje tez na database level 
- Validation Level -> strict(all inserts and updates), moderate(all inserts and updates to correct documents)
- Validation fails -> error -> deny insert/update, warn -> log but not proceed
- jest komenda createCollection ktory pozwala stworzyc collection bez inserting pierwszego dokumentu, mozna zdefiniowac:
    - required - jakie keys
    - properties - dokladniej -> dokladny opis schemy

### Create Operations
- insertOne/insertMany -> mozna zdefiniowac id ale nie trzeba
- jest jesczcze insert -> w przeszlosci bylo uzywane obecnie lepiej uzywac inserOne/insertMany --> insert nie zwraca tez id
- insertMany czy cos takiego istnieje w sql ??? 
- jednym ze sposobow jak poradzic sobie z "tagami" to ustawic _id jako tag name ! <- proste i skuteczne 
- w przypadku insertMany jesli jakis item bedzie mial error np taki sam index to wtedy poprzendnie elementy sa inserted.
    To nie jest transakcja ! - Ordered Inserts - mozna zmienic za pomoca opcji ordered ze beda kontynuoawae nastepne inserty
    rollback nie bedzie dzialal
- writeConcern - backup todolist journal - default false
- atomicity - transkaction failes as whole or succeeds as a whole for a document. Atomicity per document level !
- Document Level oznacza ze pojedyncze fieldy nie beda savewoane jesli w trakcie transakcja sie nie uda.
- mozna importowac json za pomoca mongoimport --> mozna dodac dodatkowe opcje
- find-pretty w terminalu

### Read Operations
- find -> posiada filter {}  ---> find({age:32})
- find -> filter z operatorem find({age:{$gt:30}}) ---> operator sie zaczyna z "$"
- operators: query/projection/query selectors/projection operators
- query modifiers depracated
- query operator: $eq
- projection operator $, $elemMatch, $meta, $slice -> modify data presentation
- findOne -> return document not cursor
- find -> zwraca kursor (w shellu 20 pierwszych dokumentow)
- find using operator db.movies.find({runtime:{$eq:60}}) moze byc tez np gt/lt
- $in and $nin -> array definiujaca jakie values beda zaakcoetowane {runtime:{$in:[30, 42]}}
- $or and $nor -> db.movies.find({$or:[{"rating.avarage": {$lt:5}, {"rating.avarage": {$gt: 9.3}}}]}) <---- logical operator mozna chainowac poprzednie komperatywne operatory i        fieldy. argument podaje sie w array
- $nor - reverse query, ale jest jeszcze $ne -> przeciwienstwo $and
- element operators -> $exist -> czy istnieje dokument z okreslonym keyem, $exisst zwraca jesli field jest null !! trzeba dodac ten check {age: {$exists:age, $ne:null}}
- $type -> wyszukiwanie po type (string, number itd) 
- mozna uzywac textindex(preferowany) albo regex(dla krotkich tekstow<--mozna tez na dlugich uzywac ale kwestia performance)
- $expr -> porownynie dwoch fieldow na dokumencie db.sales.find({$expr:{$gt:["$volume","$target"]}})  
- "$" w stringu wskazuje na value fielda a nie na nazwa fielda
- inny przyklad: {$expr:{$gt:[{ $cond:{if:{$gte:["$volume", 190],then: {$subtract: ["$volume", 10], else:"$volume"}}, "$target"}}]}}
- $all - dunno
- $elemMatch - dunno