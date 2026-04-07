package com.hackathon.app.service;

import com.hackathon.app.dto.response.SpecialtyResponse;
import com.hackathon.app.entity.Specialty;
import com.hackathon.app.exception.ResourceNotFoundException;
import com.hackathon.app.repository.SpecialtyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SpecialtyService {

    private final SpecialtyRepository specialtyRepository;

    public List<SpecialtyResponse> getAllSpecialties() {
        return specialtyRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public SpecialtyResponse getById(Long id) {
        Specialty specialty = specialtyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Specialty not found"));
        return toResponse(specialty);
    }

    private SpecialtyResponse toResponse(Specialty s) {
        return SpecialtyResponse.builder()
                .id(s.getId())
                .name(s.getName())
                .description(s.getDescription())
                .build();
    }
}
