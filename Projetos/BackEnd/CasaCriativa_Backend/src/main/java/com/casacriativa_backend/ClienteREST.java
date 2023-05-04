package com.casacriativa_backend;

import org.aspectj.lang.annotation.RequiredTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(value = "/cliente")
public class ClienteREST {

    @Autowired
    private ClienteDAO clienteDAO;

    @GetMapping
    public List<Cliente>get(){return clienteDAO.findAll();}

    @PostMapping
    public void post(@RequestBody Cliente cliente){clienteDAO.save(cliente);}
}
