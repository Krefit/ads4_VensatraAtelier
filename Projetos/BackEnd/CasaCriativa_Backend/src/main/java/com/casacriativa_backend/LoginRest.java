package com.casacriativa_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value= "/login")
public class LoginRest {

    @Autowired
    private LoginDAO loginDAO;

    @GetMapping
    public List<Login>get(){return loginDAO.findAll();}
}
