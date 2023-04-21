import React, { useState } from "react"
import classes from "./typeDetail.module.css"
import img from "../../assets/img3.jpg"
import { AiFillStar } from "react-icons/ai"
import { useEffect } from "react"
import { useRef } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux'
import { getDatesInRange, isUnavailable } from "../../utils/dateFunc"

const TypeDetail = () => {
    const {startDate: startDateRedux, endDate: endDateRedux} = useSelector((state) => state.search)
    const [roomDetails, setRoomDetails] = useState("")
    const [startDate, setStartDate] => useState(startDateRedux || "")
    const [endDate, setEndDate] = useState(endDateRedux || "")
    const [username, setUsername] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [email, setEmail] = useState("")
    
    const { token } = useSelector((state) => state.auth)
    const { id } = useParams()
    const containerRef = useRef()

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const res = await fetch(`http://localhost:5500/room/find/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    method: "GET"
                })
                const room = await res.json()
                setRoomDetails(room)
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchRoom()
    }, [id])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const yourBookedDates = getDatesInRange(startDate, endDate)
        const isUnavailableDates = isUnavailable(roomDetails, yourBookedDates)

        if (isUnavailableDates {
            const lastAvailableDate = new Date(roomDetails.unavailableDates(roomDetails.unavailableDates.length - 1))   
            
        })
    }
}