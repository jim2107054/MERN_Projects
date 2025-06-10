import add_icon from './add_icon.svg'
import admin_logo from './admin_logo.svg'
import appointment_icon from './appointment_icon.svg'
import cancel_icon from './cancel_icon.svg'
import doctor_icon from './doctor_icon.svg'
import home_icon from './home_icon.svg'
import people_icon from './people_icon.svg'
import upload_area from './upload_area.svg'
import list_icon from './list_icon.svg'
import tick_icon from './tick_icon.svg'
import appointments_icon from './appointments_icon.svg'
import earning_icon from './earning_icon.svg'
import patients_icon from './patients_icon.svg'
import group_profiles from './assets_frontend/group_profiles.png'
import arrow_icon from './assets_frontend/arrow_icon.svg'
import header_img from './assets_frontend/header_img.png'
import appointment_img from './assets_frontend/appointment_img.png'
import profile_pic from './assets_frontend/profile_pic.png'
import contact_image from './assets_frontend/contact_image.png'
import about_image from './assets_frontend/about_image.png'
import logo from './assets_frontend/logo.svg'
import dropdown_icon from './assets_frontend/dropdown_icon.svg'
import menu_icon from './assets_frontend/menu_icon.svg'
import cross_icon from './assets_frontend/cross_icon.png'
import chats_icon from './assets_frontend/chats_icon.svg'
import verified_icon from './assets_frontend/verified_icon.svg'
import info_icon from './assets_frontend/info_icon.svg'
import upload_icon from './assets_frontend/upload_icon.png'
import stripe_logo from './assets_frontend/stripe_logo.png'
import razorpay_logo from './assets_frontend/razorpay_logo.png'
import doc1 from './assets_frontend/doc1.png'
import doc2 from './assets_frontend/doc2.png'
import doc3 from './assets_frontend/doc3.png'
import doc4 from './assets_frontend/doc4.png'
import doc5 from './assets_frontend/doc5.png'
import doc6 from './assets_frontend/doc6.png'
import doc7 from './assets_frontend/doc7.png'
import doc8 from './assets_frontend/doc8.png'
import doc9 from './assets_frontend/doc9.png'
import doc10 from './assets_frontend/doc10.png'
import doc11 from './assets_frontend/doc11.png'
import doc12 from './assets_frontend/doc12.png'
import doc13 from './assets_frontend/doc13.png'
import doc14 from './assets_frontend/doc14.png'
import doc15 from './assets_frontend/doc15.png'
import Dermatologist from './assets_frontend/Dermatologist.svg'
import Gastroenterologist from './assets_frontend/Gastroenterologist.svg'
import General_physician from './assets_frontend/General_physician.svg'
import Gynecologist from './assets_frontend/Gynecologist.svg'
import Neurologist from './assets_frontend/Neurologist.svg'
import Pediatricians from './assets_frontend/Pediatricians.svg'


export const assets = {
    add_icon,
    admin_logo,
    appointment_icon,
    cancel_icon,
    doctor_icon,
    upload_area,
    home_icon,
    patients_icon,
    people_icon,
    list_icon,
    tick_icon,
    appointments_icon,
    earning_icon,
    group_profiles,
    arrow_icon,
    header_img,
    appointment_img,
    profile_pic,
    contact_image,
    about_image,
    logo,
    dropdown_icon,
    menu_icon,
    cross_icon,
    chats_icon,
    verified_icon,
    info_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo,
    doc1,
    doc2,
    doc3,
    doc4,
    doc5,
    doc6,
    doc7,
    doc8,
    doc9,
    doc10,
    doc11,
    doc12,
    doc13,
    doc14,
    doc15,
    Dermatologist,
    Gastroenterologist,
    General_physician,
    Gynecologist,
    Neurologist,
    Pediatricians
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Richard James',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        // address: {
        //     line1: '17th Cross, Richmond',
        //     line2: 'Circle, Ring Road, London'
        // }
        address: '17th Cross, Richmond Circle, Ring Road, London'
    },
    {
        _id: 'doc2',
        name: 'Dr. Emily Larson',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Emily Larson has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Emily Larson has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        // address: {
        //     line1: '27th Cross, Richmond',
        //     line2: 'Circle, Ring Road, London'
        // }
        address: '27th Cross, Richmond Circle, Ring Road, London'
    },
    {
        _id: 'doc3',
        name: 'Dr. Sarah Patel',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Sarah Patel has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Sarah Patel has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        // address: {
        //     line1: '27th Cross, Richmond',
        //     line2: 'Circle, Ring Road, London'
        // }
        address: '27th Cross, Richmond Circle, Ring Road, London'
    },
    {
        _id: 'doc4',
        name: 'Dr. Christopher Lee',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Christopher Lee has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Christopher Lee has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        // address: {
        //     line1: '27th Cross, Richmond',
        //     line2: 'Circle, Ring Road, London'
        // }
        address: '27th Cross, Richmond Circle, Ring Road, London'
    },
    {
        _id: 'doc5',
        name: 'Dr. Jennifer Garcia',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Jennifer Garcia has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Jennifer Garcia has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        // address: {
        //     line1: '27th Cross, Richmond',
        //     line2: 'Circle, Ring Road, London'
        // }
        address: '27th Cross, Richmond Circle, Ring Road, London'
    },
    {
        _id: 'doc6',
        name: 'Dr. Andrew Williams',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        // address: {
        //     line1: '27th Cross, Richmond',
        //     line2: 'Circle, Ring Road, London'
        // }
        address: '27th Cross, Richmond Circle, Ring Road, London'
    },
    {
        _id: 'doc7',
        name: 'Dr. Christopher Davis',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        // address: {
        //     line1: '27th Cross, Richmond',
        //     line2: 'Circle, Ring Road, London'
        // }
        address: '27th Cross, Richmond Circle, Ring Road, London'
    },
    {
        _id: 'doc8',
        name: 'Dr. Timothy White',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        // address: {
        //     line1: '27th Cross, Richmond',
        //     line2: 'Circle, Ring Road, London'
        // }
        address: '27th Cross, Richmond Circle, Ring Road, London'
    },
    {
        _id: 'doc9',
        name: 'Dr. Ava Mitchell',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        // address: {
        //     line1: '27th Cross, Richmond',
        //     line2: 'Circle, Ring Road, London'
        // }
        address: '27th Cross, Richmond Circle, Ring Road, London'
    },
    {
        _id: 'doc10',
        name: 'Dr. Jeffrey King',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        // address: {
        //     line1: '27th Cross, Richmond',
        //     line2: 'Circle, Ring Road, London'
        // }
        address: '27th Cross, Richmond Circle, Ring Road, London'
    },
    {
        _id: 'doc11',
        name: 'Dr. Zoe Kelly',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        // address: {
        //     line1: '27th Cross, Richmond',
        //     line2: 'Circle, Ring Road, London'
        // }
        address: '27th Cross, Richmond Circle, Ring Road, London'
    },
    {
        _id: 'doc12',
        name: 'Dr. Patrick Harris',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        // address: {
        //     line1: '27th Cross, Richmond',
        //     line2: 'Circle, Ring Road, London'
        // }
        address: '27th Cross, Richmond Circle, Ring Road, London'
    },
    {
        _id: 'doc13',
        name: 'Dr. Chloe Evans',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        // address: {
        //     line1: '27th Cross, Richmond',
        //     line2: 'Circle, Ring Road, London'
        // }
        address: '27th Cross, Richmond Circle, Ring Road, London'
    },
    {
        _id: 'doc14',
        name: 'Dr. Ryan Martinez',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        // address: {
        //     line1: '27th Cross, Richmond',
        //     line2: 'Circle, Ring Road, London'
        // }
        address: '27th Cross, Richmond Circle, Ring Road, London'
    },
    {
        _id: 'doc15',
        name: 'Dr. Amelia Hill',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        // address: {
        //     line1: '27th Cross, Richmond',
        //     line2: 'Circle, Ring Road, London'
        // }
        address: '27th Cross, Richmond Circle, Ring Road, London'
    },
]
