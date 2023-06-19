package com.casacriativa_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @PutMapping("/{id}")
    public void editar(@PathVariable("id") int id, @RequestBody Material material) {
        Optional<Material> materialExistenteOptional = materialDAO.findById(id);
        if (materialExistenteOptional.isPresent()) {
            Material materialExistente = materialExistenteOptional.get();
            materialExistente.setMatDescricao(material.getMatDescricao());
            materialExistente.setMatPreco(material.getMatPreco());
            materialExistente.setMatQuantidade(material.getMatQuantidade());


            materialDAO.save(materialExistente);
        } else {
            throw new RuntimeException("cliente não encontrado com o ID: " + id);
        }
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id) {
        materialDAO.deleteById(id);
    }
}
