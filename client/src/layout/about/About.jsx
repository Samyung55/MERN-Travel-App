import React from "react";
import classes from "./about.module.css";
import img1 from "../../assets/img1"
import { GiPalmTree } from "react-icons/gi"
import { FaUmbrellaBeach } from "react-icons/fa"
import { BiHappy } from "react-icons/bi"
import { useState } from "react"
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom"
import { search } from "../../hooks/search"

const About = () => {
    const [type, setType] = useState("");
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSearch = () => {
        const startDateFormatted = new Date(startDate)
        const endDateFormatted = new Date(endDate)
        console.log(startDateFormatted, endDateFormatted)
    }
}