import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import Swal from 'sweetalert2'
import axios from 'axios';
import emailjs from 'emailjs-com';


function FormPage() {
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  // Fetch province options
  useEffect(() => {
    fetch(`/locales/${i18next.language}/province.json`)
      .then(response => response.json())
      .then(data => {
        setProvinceOptions(data);
        setLoading(false); // Once data is fetched, stop loading
      })
      .catch(error => {
        console.error('Error fetching province data:', error);
        setLoading(false);
      });
  }, [t]);

  const [formData, setFormData] = useState({
    product: '',
    name: '',
    email: '',
    company: '',
    tel: '',
    line: '',
    fax: '',
    position: '',
    province: 'กรุงเทพมหานคร',
    time: '',
    message: '',
    requirement: {
      รายละเอียด: false,
      ใบเสนอราคา: false,
      วิธีแก้ปัญหาการใช้งาน: false,
      ข้อมูลการจัดส่งสินค้า: false,
      ทดสอบใช้สินค้าเเละบริการ: false,
      ต้องการให้พนักงานขายติดต่อกลับ: false,
      ตัวแทนจัดจำหน่าย: false,
    },
    accepted_terms: false
  });


  // Handle form data changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name === 'accepted_terms') {  // Changed 'accept' to 'accepted_terms'
        setFormData({
          ...formData,
          accepted_terms: checked,  // Update the 'accepted_terms' field
        });
      } else {
        setFormData({
          ...formData,
          requirement: {
            ...formData.requirement,
            [name]: checked, // Set the checkbox as checked or unchecked
          },
        });
      }
    } else {
      // Handle other form inputs (e.g., text, select, etc.)
      setFormData({
        ...formData,
        [name]: value, // Update the field directly in the formData
      });
    }
  };


  const requirementLabels = {
    รายละเอียด: 'รายละเอียด',
    ใบเสนอราคา: 'ใบเสนอราคา',
    วิธีแก้ปัญหาการใช้งาน: 'วิธีแก้ปัญหาการใช้งาน',
    ข้อมูลการจัดส่งสินค้า: 'ข้อมูลการจัดส่งสินค้า',
    ทดสอบใช้สินค้าเเละบริการ: 'ทดสอบใช้สินค้าเเละบริการ',
    ต้องการให้พนักงานขายติดต่อกลับ: 'ต้องการให้พนักงานขายติดต่อกลับ',
    ตัวแทนจัดจำหน่าย: 'ตัวแทนจัดจำหน่าย',
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if accepted_terms are accepted
    if (!formData.accepted_terms) {  // Changed 'accept' to 'accepted_terms'
      Swal.fire({
        title: 'Error!',
        text: 'You must agree to the accepted_terms and conditions.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return; // Stop form submission
    }

    // Map the boolean value of accepted_terms to "ยอมรับ" or "ไม่ยอมรับ"
    const acceptedTermsValue = formData.accepted_terms ? "ยอมรับ" : "ไม่ยอมรับ";

    // Prepare selected data for the requirements field
    const selectedData = Object.keys(formData.requirement)
      .filter((key) => formData.requirement[key]) // Filter only checked options
      .map((key) => requirementLabels[key]); // Map to human-readable labels

    // Join the selected requirements into a comma-separated string
    const selectedDataString = selectedData.join(', ');

    // Create final form data object with selected requirements string and the accepted_terms value
    const finalFormData = {
      ...formData,
      requirement: selectedDataString, // Pass the selected requirements string
      accepted_terms: acceptedTermsValue, // Store accepted_terms as "ยอมรับ" or "ไม่ยอมรับ"
    };

    console.log('Final Form Data:', finalFormData); // This will show the updated data with 'requirement' and 'accepted_terms'

    // Send email using EmailJS
    emailjs
      .send(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, finalFormData, process.env.REACT_APP_EMAILJS_USER_ID)
      .then(
        (response) => {
          setFormData({
            product: '',
            name: '',
            email: '',
            company: '',
            tel: '',
            line: '',
            fax: '',
            position: '',
            province: 'กรุงเทพมหานคร',
            time: '',
            message: '',
            requirement: {
              รายละเอียด: false,
              ใบเสนอราคา: false,
              วิธีแก้ปัญหาการใช้งาน: false,
              ข้อมูลการจัดส่งสินค้า: false,
              ทดสอบใช้สินค้าเเละบริการ: false,
              ต้องการให้พนักงานขายติดต่อกลับ: false,
              ตัวแทนจัดจำหน่าย: false,
            },
            accepted_terms: false,
          });
        },
        (error) => {
          console.error('Error sending email:', error);
          Swal.fire({
            title: 'Error!',
            text: 'There was an issue sending the email. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      );

    // Send the request to the backend
    axios.post(`${process.env.REACT_APP_API}/api/createform`, finalFormData, {})
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 'ok') {
          Swal.fire({
            title: 'Success!',
            text: 'Form submitted successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          setTimeout(() => {
            window.location = "/requestform"; // Redirect after success
          }, 1000);
        } else {
          Swal.fire({
            title: 'Fail!',
            text: 'Submitted form failed!',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          title: 'Error!',
          text: 'There was an issue when submitting a form. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  return (
    <div className="min-h-screen font-plex-sans-thai">
      <div className="mt-[84px] px-10 xl:px-24 py-3 bg-[#0079A9] text-white md:flex md:justify-between md:items-center">
        <p className="py-1">
          <Link to="/" className="hover:text-[#EEE185]">{t('formpage.p1')}</Link>
          <span>{t('formpage.p3')}</span>
        </p>
        <h2 className="py-1 text-[20px]">{t('formpage.p4')}</h2>
      </div>

      <div className="mx-[10%] max-w-[1400px] 2xl:mx-[auto] pt-4 pb-10">
        <div className="mb-[30px]">
          <h1 className="text-[30px]">{t('formpage.p5')}</h1>
          <div className="text-[#E2B22C] h-[3px] w-[60px] bg-[#E2B22C]" />
        </div>

        <div className="my-[10px] px-[20px] py-[10px] border-[1px] border-lightgray rounded-md">
          <div className="text-center">
            <h1 className="text-[30px]">{t('formpage.p7')}</h1>
            <div className="text-[#E2B22C] h-[3px] w-[60px] bg-[#E2B22C] m-[auto]" />
          </div>

          <form className="py-6" onSubmit={handleSubmit}>
            <div className="md:flex">
              <div className="md:w-[50%] md:pr-[10px]">
                <div className="pt-4">
                  <label htmlFor="product" className="font-semibold py-1">{t('formpage.p8')}<span className="text-[#DC3545]">*</span></label><br />
                  <input
                    type="text"
                    id="product"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    required
                    className="border w-[100%] py-1.5 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300" />
                </div>

                {/* Telephone Field */}
                <div className="pt-4">
                  <label htmlFor="tel" className="font-semibold py-1">{t('formpage.p9')}<span className="text-[#DC3545]">*</span></label><br />
                  <input
                    type="tel"
                    id="tel"
                    name="tel"
                    value={formData.tel}
                    onChange={handleChange}
                    maxLength="16" minLength="6" required className="border w-[100%] py-1.5 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300" />
                </div>

                {/* Email Field */}
                <div className="pt-4">
                  <label htmlFor="email" className="font-semibold py-1">{t('formpage.p10')}<span className="text-[#DC3545]">*</span></label><br />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border w-[100%] py-1.5 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300" />
                </div>

                {/* Company Field */}
                <div className="pt-4">
                  <label htmlFor="company" className="font-semibold py-1">{t('formpage.p11')}</label><br />
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="border w-[100%] py-1.5 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300" />
                </div>

                {/* Province Select */}
                <div className="pt-4">
                  <label htmlFor="province" className="font-semibold py-1">{t('formpage.p12')}<span className="text-[#DC3545]">*</span></label><br />
                  {loading ? (
                    <p>Loading provinces...</p>
                  ) : (
                    <select
                      name="province"
                      id="province"
                      className="border w-[100%] py-1 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                      value={formData.province} // Ensure it binds the value correctly
                      onChange={handleChange}
                      required
                    >
                      {provinceOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              <div className="md:w-[50%] md:pl-[10px]">
                {/* Name Field */}
                <div className="pt-4">
                  <label htmlFor="name" className="font-semibold py-1">{t('formpage.p13')}<span className="text-[#DC3545]">*</span></label><br />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border w-[100%] py-1.5 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300" />
                </div>


                {/* Line Field */}
                <div className="pt-4">
                  <label htmlFor="line" className="font-semibold py-1">{t('formpage.p14')}</label><br />
                  <input
                    type="text"
                    id="line"
                    name="line"
                    value={formData.line}
                    onChange={handleChange}
                    className="border w-[100%] py-1.5 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300" />
                </div>

                <div className="pt-4">
                  <label htmlFor="fax" className="font-semibold py-1">{t('formpage.p15')}</label><br />
                  <input
                    type="text"
                    id="fax"
                    name="fax"
                    value={formData.fax}
                    onChange={handleChange}
                    className="border w-[100%] py-1.5 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300" />
                </div>

                {/* Position Field */}
                <div className="pt-4">
                  <label htmlFor="position" className="font-semibold py-1">{t('formpage.p16')}</label><br />
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="border w-[100%] py-1.5 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300" />
                </div>


                {/* Time Select */}
                <div className="pt-4">
                  <label htmlFor="time" className="font-semibold py-1">{t('formpage.p17')}</label><br />
                  <select
                    name="time"
                    id="time"
                    value={formData.time} // Ensure it's correctly bound
                    onChange={handleChange}
                    className="border w-[100%] py-1 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                  >
                    <option value="ไม่ระบุ">{t('formpage.p18')}</option>
                    <option value="ต้องการใช้ทันที">{t('formpage.p19')}</option>
                    <option value="ภายใน 2 วัน">{t('formpage.p20')}</option>
                    <option value="ภายใน 1 อาทิตย์">{t('formpage.p21')}</option>
                    <option value="ภายใน 2 อาทิตย์">{t('formpage.p22')}</option>
                    <option value="ภายใน 1 เดือน">{t('formpage.p23')}</option>
                    <option value="ภายใน 2 เดือน">{t('formpage.p24')}</option>
                    <option value="ภายใน 3 เดือน">{t('formpage.p25')}</option>
                    <option value="ภายใน 4 เดือน">{t('formpage.p26')}</option>
                    <option value="ภายใน 5 เดือน">{t('formpage.p27')}</option>
                    <option value="ภายใน 6 เดือน">{t('formpage.p28')}</option>
                    <option value="ภายใน 12 เดือน">{t('formpage.p29')}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Data Checkbox Fields */}
            <div className="pt-4">
              <label htmlFor="requirement" className="font-semibold py-1">{t('formpage.p30')}<span className="text-[#DC3545]">*</span></label><br />
              <input type="checkbox" id="รายละเอียด" name="รายละเอียด" checked={formData.requirement.รายละเอียด} onChange={handleChange} className="mr-2" />
              <label htmlFor="รายละเอียด">{t('formpage.p31')}</label><br />
              <input type="checkbox" id="ใบเสนอราคา" name="ใบเสนอราคา" checked={formData.requirement.ใบเสนอราคา} onChange={handleChange} className="mr-2" />
              <label htmlFor="ใบเสนอราคา">{t('formpage.p32')}</label><br />
              <input type="checkbox" id="วิธีแก้ปัญหาการใช้งาน" name="วิธีแก้ปัญหาการใช้งาน" checked={formData.requirement.วิธีแก้ปัญหาการใช้งาน} onChange={handleChange} className="mr-2" />
              <label htmlFor="วิธีแก้ปัญหาการใช้งาน">{t('formpage.p33')}</label><br />
              <input type="checkbox" id="ข้อมูลการจัดส่งสินค้า" name="ข้อมูลการจัดส่งสินค้า" checked={formData.requirement.ข้อมูลการจัดส่งสินค้า} onChange={handleChange} className="mr-2" />
              <label htmlFor="ข้อมูลการจัดส่งสินค้า">{t('formpage.p34')}</label><br />
              <input type="checkbox" id="ทดสอบใช้สินค้าเเละบริการ" name="ทดสอบใช้สินค้าเเละบริการ" checked={formData.requirement.ทดสอบใช้สินค้าเเละบริการ} onChange={handleChange} className="mr-2" />
              <label htmlFor="ทดสอบใช้สินค้าเเละบริการ">{t('formpage.p35')}</label><br />
              <input type="checkbox" id="ต้องการให้พนักงานขายติดต่อกลับ" name="ต้องการให้พนักงานขายติดต่อกลับ" checked={formData.requirement.ต้องการให้พนักงานขายติดต่อกลับ} onChange={handleChange} className="mr-2" />
              <label htmlFor="ต้องการให้พนักงานขายติดต่อกลับ">{t('formpage.p36')}</label><br />
              <input type="checkbox" id="ตัวแทนจัดจำหน่าย" name="ตัวแทนจัดจำหน่าย" checked={formData.requirement.ตัวแทนจัดจำหน่าย} onChange={handleChange} className="mr-2" />
              <label htmlFor="ตัวแทนจัดจำหน่าย">{t('formpage.p37')}</label><br />
            </div>


            {/* Other Information */}
            <div className="pt-4">
              <label htmlFor="message" className="font-semibold py-1">{t('formpage.p38')}</label><br />
              <textarea id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                cols="50"
                className="border w-[100%] px-3 py-1 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300" />
            </div>

            <div className="pt-4">
              <label htmlFor="accepted_terms">

                <input type="checkbox" name="accepted_terms" id="accepted_terms" className="mr-2" checked={formData.accepted_terms} // Use the boolean value directly for the checkbox
                  onChange={handleChange} required />
                <span className="">{t('formpage.p41')}</span>
              </label>
            </div>


            {/* Submit Button */}
            <div className="flex justify-center pt-5">
              <Link to={`/`}>
                <button type="button" className="py-1 px-2 mx-2 text-[#DC3545] border border-[#DC3545] hover:text-white hover:bg-[#DC3545]  transition duration-300">{t('formpage.p39')}</button>
              </Link>
              <input type="submit" value={t('formpage.p40')} className="py-1 px-2 text-[#28A745] border border-[#28A745] hover:text-white hover:bg-[#28A745] cursor-pointer transition duration-300" />
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default FormPage;
