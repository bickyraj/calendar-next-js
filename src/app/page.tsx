'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [availabilities, setAvailabilities] = useState([]);
  const [toggleForm, setToggleForm] = useState(false);
  const [selectedAvailabilityId, setSelectedAvailabilityId] = useState(null)
  const [selectedAvailability, setSelectedAvailability] = useState({
    start: '',
    end: '',
    id: null
  })
  const [formData, setFormData] = useState({
    title: '',
    email: '',
    availability_id: null,
  });
  const [loading, setLoading] = useState(true);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const apiUrl = 'http://127.0.0.1:8000/reservations';
      const response = await axios.post(apiUrl, {
        ...formData,
        availability_id: selectedAvailabilityId,
        start: selectedAvailability.start,
        end: selectedAvailability.end
      });
      console.log('Response from server:', response.data);
      setFormData({
        title: '',
        email: '',
        availability_id: null
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/availabilities')
      .then((response) => {
        console.log(response.data);
        setAvailabilities(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleSelectAvailability = (item: any) => {
    if (item.is_available === 0) {
      // Update the counter when the button is clicked
      setToggleForm(!toggleForm);
      setSelectedAvailabilityId(item.id)
      setSelectedAvailability(item)
    } else {
      return;
    }
  };
  
  return (
    <>
      <div className="min-h-full">
        <nav className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Reservation</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Reservation</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Availabilities</h3>
                  </div>
                </div>
                <div className="mt-7 mb-7">
                  {toggleForm ? (
                    <div id="reservation-for">
                      <form onSubmit={handleSubmit}>
                        <div className="space-y-12">
                          <div className="border-b border-gray-900/10 pb-12">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              <div className="sm:col-span-6">
                                <div className="inline-flex w-full justify-center rounded-md bg-green-100 px-3 py-2 text-sm font-medium text-green-800 shadow-sm sm:mr-3 sm:w-auto">{`${selectedAvailability.start} - ${selectedAvailability.end}`}</div>
                              </div>
                              <div className="sm:col-span-6">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                                <div className="mt-2">
                                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input required type="text" value={formData.title}
                                      onChange={handleInputChange} name="title" id="title" autoComplete='off' className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:outline-none placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="" />
                                  </div>
                                </div>
                              </div>
                              <div className="sm:col-span-6">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                                <div className="mt-2">
                                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input required type="email" value={formData.email}
                                      onChange={handleInputChange} name="email" id="email" autoComplete='off' className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:outline-none placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {toggleForm ? (
                          <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button type="submit" className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto">Submit</button>
                            <button type="button" onClick={() => setToggleForm(false)} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Back</button>
                          </div>
                        ) : null}
                      </form>
                    </div>
                  ) :
                    <div id='availability-block'>
                      {availabilities.map((item: any) => (
                        <button key={item.id} type="button" onClick={() => handleSelectAvailability(item)} className={`inline-flex w-full justify-center rounded-md ${item.is_available === 1 ? 'bg-gray-100 cursor-not-allowed' : 'bg-green-100 hover:bg-green-300 hover:text-green-900'} px-3 py-2 text-sm font-medium text-green-800 mb-3 shadow-sm  sm:mr-3 sm:w-auto`}>{item.start} - {item.end}</button>
                      ))}
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}