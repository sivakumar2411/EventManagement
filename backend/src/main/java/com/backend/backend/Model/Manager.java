package com.backend.backend.Model;

import java.util.Date;
import java.util.List;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class Manager 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String firstName,lastName,address,city,state,postCode,email,mobNo;

    private List<Integer> reqeids;

    @OneToMany(mappedBy ="manager",cascade = CascadeType.ALL)
    private List<Event> events;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Review> review;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String resume,profImg;

    private int exp;

    private boolean accept = false;

    private Date birthDate;
}
