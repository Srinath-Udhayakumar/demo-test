package com.hackathon.app.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "doctors")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "specialty_id", nullable = false)
    private Specialty specialty;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AppointmentMode mode;

    @Builder.Default
    private boolean available = true;

    private Double consultationFee;

    private String availableSlots;
}
