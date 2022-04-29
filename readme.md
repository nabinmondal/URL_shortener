Techstack 
    1.Nodejs 
    2.expressJs.
    3.MongoDB.

Methodology-
    For the creation of unique short url and to preserve the uniqueness of the shorturl I have used Date.now() functions which return the time passed in miliseccond from 1970s.
    But since with time the short was getting bigger so in order to solve that problem I have used Base62 encoding to short the number.
    By this way I am able to preserve that the urls are short and the urls are unique.

To do  : 
    In this project there is a problem of if two users hit at the same time at the milisecond level then it may cause some level of inconsistency.

 
In this API - 
   Method      Url                     functionalities
1. get       /urls             It lists all the urls stored in the DB.

2. post      /urls             It creates a new url and returns that.

3. get       /urls/shortUrl    It returns the specific long url.

4. delete    /urls/shorturl    It deletes the particular short url.

5. patch     /urls/shorturl    it takes up the shorturl and update the longurl.     