package com.casacriativa_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/material")
public class MaterialRest {
    @Autowired
    private MaterialDAO materialDAO;

    @GetMapping
    public List<Material>get(){return materialDAO.findAll();
    }

    @PostMapping
    public void post(@RequestBody Material material){materialDAO.save(material);
    }
}
