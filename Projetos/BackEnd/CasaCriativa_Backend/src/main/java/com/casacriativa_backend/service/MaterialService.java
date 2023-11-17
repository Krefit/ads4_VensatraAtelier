package com.casacriativa_backend.service;

import com.casacriativa_backend.model.Material;
import com.casacriativa_backend.repository.MaterialRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaterialService {

    private final MaterialRepository materialRepository;

    public MaterialService(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    public List<Material> listarMaterial(){
        return materialRepository.findAll();
    }

    public void createMaterial(Material material){
        materialRepository.save(material);
    }

    public void updateMaterial(Integer id, Material material){
        Optional<Material> recordFoundOptional = materialRepository.findById(id);
        if(recordFoundOptional.isPresent()){
            Material changedRecord = recordFoundOptional.get();
            changedRecord.setDescricao(material.getDescricao());
            changedRecord.setPreco(material.getPreco());
            changedRecord.setQuantidade(material.getQuantidade());

            materialRepository.save(changedRecord);
        } else {
            throw new RuntimeException("Record não encontrado com o ID: " + id);
        }
    }

    public void deleteMaterial(Integer id){
        materialRepository.deleteById(id);
    }

    public Material getMaterialPorID(int materialId) {
        return materialRepository.findById(materialId).orElse(null);
    }

}
