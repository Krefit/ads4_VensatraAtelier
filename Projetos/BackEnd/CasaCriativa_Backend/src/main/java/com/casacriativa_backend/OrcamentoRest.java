package com.casacriativa_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orcamento")
public class OrcamentoRest {

    @Autowired
    private OrcamentoDAO orcamentoDAO;

    @GetMapping
    public List<Orcamento>get(){return orcamentoDAO.findAll();}

    @PostMapping
    public void post(@RequestBody Orcamento orcamento){orcamentoDAO.save(orcamento);
    }
}
