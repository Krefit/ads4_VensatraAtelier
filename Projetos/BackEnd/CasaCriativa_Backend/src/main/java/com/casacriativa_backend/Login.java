package com.casacriativa_backend;

import javax.annotation.PostConstruct;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Login {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    int LogID;
    String LogEmail;
    String LogPassword;

    public int getLogID() {
        return LogID;
    }

    public String getLogEmail() {
        return LogEmail;
    }

    public Login setLogEmail(String logEmail) {
        LogEmail = logEmail;
        return this;
    }

    public String getLogPassword() {
        return LogPassword;
    }

    public Login setLogPassword(String logPassword) {
        LogPassword = logPassword;
        return this;
    }

    public Login setLogID(int logID) {
        LogID = logID;
        return this;
    }



    }

