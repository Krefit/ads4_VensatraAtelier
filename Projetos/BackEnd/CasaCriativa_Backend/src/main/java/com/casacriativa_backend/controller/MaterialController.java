package com.casacriativa_backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.casacriativa_backend.model.Material;
import com.casacriativa_backend.model.Produto;
import com.casacriativa_backend.repository.MaterialRepository;
import com.casacriativa_backend.repository.ProdutoRepository;

@RestController
@RequestMapping("/api/material")
public class MaterialController {

    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @GetMapping
    public ResponseEntity<List<Material>> getAllMaterial(){
        List<Material> material = new ArrayList<Material>();

        materialRepository.findAll().forEach(material::add);

        if(material.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(material, HttpStatus.OK);
    }

    @GetMapping("/{produtoId}/material")
    public ResponseEntity<List<Material>> getAllMaterialPorProdutoId(@PathVariable(value = "produtoId") int produtoId){
        if(!produtoRepository.existsById(produtoId)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<Material> materialLista = materialRepository.findByMateriaisProdutos_Produto_Id(produtoId);
        return new ResponseEntity<>(materialLista, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Material> getMaterialPorId(@PathVariable(value = "id") int id){
        Material material = materialRepository.findById(id).orElseThrow(RuntimeException::new);

        return new ResponseEntity<>(material, HttpStatus.OK);
    }

    @GetMapping("/{materialId}/produto")
    public ResponseEntity<List<Produto>> getAllProdutoporMaterialId(@PathVariable(value = "materialId") int materialId){

        if(!materialRepository.existsById(materialId)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<Produto> produtos = produtoRepository.findByProdutosMateriais_Material_Id(materialId);
        return new ResponseEntity<>(produtos, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Material> updateMaterial(@PathVariable("id") int id, @RequestBody Material materialRequest){
        Material material = materialRepository.findById(id).orElseThrow();

        material.setDescricao(materialRequest.getDescricao());
        material.setPreco(materialRequest.getPreco());
        material.setQuantidade(materialRequest.getQuantidade());

        return new ResponseEntity<>(materialRepository.save(material), HttpStatus.OK);
    }

    @DeleteMapping("/{produtoId}/material/{materialId}")
    public ResponseEntity<HttpStatus> deleteMaterialDeProduto(@PathVariable(value = "produtoId") int produtoId, @PathVariable(value = "materialId") int materialId) {
        if (!produtoRepository.existsById(produtoId)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Produto produto = produtoRepository.findById(produtoId).orElseThrow();

        // Assuming the Produto class has a method to remove materials
        produto.removeMaterial(materialId);

        produtoRepository.save(produto);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteMaterial(@PathVariable("id") int id){
        materialRepository.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping
    public void createMaterial(@RequestBody Material material) {
        materialRepository.save(material);
    }


}
