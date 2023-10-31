package com.casacriativa_backend.controller;

import com.casacriativa_backend.model.Material;
import com.casacriativa_backend.service.MaterialService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/material")
public class MaterialController {

    private final MaterialService materialService;

    public MaterialController(MaterialService materialService) {
        this.materialService = materialService;
    }

    @GetMapping
    public List<Material> listarMaterial() {
        return materialService.listarMaterial();
    }

    @PostMapping
    public void createMaterial(@RequestBody Material material) {
        materialService.createMaterial(material);
    }

    @PutMapping("/{id}")
    public void editarMaterial(@PathVariable("id") Integer id, @RequestBody Material material) {
        materialService.updateMaterial(id, material);
    }

    @DeleteMapping("/{id}")
    public void deleteMaterial(@PathVariable("id") Integer id) {
        materialService.deleteMaterial(id);
    }
}
