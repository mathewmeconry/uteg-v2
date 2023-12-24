## Base schema without module

```mermaid
erDiagram
    Starter {
        int ID PK
        string firstname
        string lastname
        int birthyear
    }

    Club {
        int ID PK
        string name
        string location
    }

    Competition {
        int ID PK
        string name
        string location
        date startDate
        date endDate
        int grounds
        string[] modules
    }

    Starter2Competition {
        int ID PK
        int starterID FK
        int competitionID FK
        int clubID FK
    }

    Starter ||--}| Starter2Competition : starterID
    Competition ||--}| Starter2Competition : competitionID
    Club ||--}| Starter2Competition : clubID

    Grade {
        int ID PK
        int starter2CompetitionID FK
        int value
        int device
        string module
    }

    Grade |{--|| Starter2Competition: starter2CompetitionID

    User {
        int ID PK
        string email
        string password
    }

    User2Competition {
        int ID PK
        int competitionID FK
        int userID FK
        string role
    }

    User ||--}| User2Competition: userID
    User2Competition |{--|| Competition: competitionID


    Judgetoken {
        int ID PK
        int competitionID FK
        int device
        int ground
    }
    
    Judgetoken |{--|| Competition: competitionID
```

## EGT Module schema

Entities created by the EGT module are prefixed with `EGT_`

```mermaid
erDiagram
    EGT_Division["Division"] {
        int ID PK
        int competitionID FK
        int ground
    }

    EGT_Division |{--|| Competition: competitionID

    EGT_Lineup["Lineup"] {
        int ID PK
        int divisionID FK
        int[] starter2competitionIDs FK
        int startDevice
    }

    EGT_Lineup |{--|| EGT_Division: divisionID
```
