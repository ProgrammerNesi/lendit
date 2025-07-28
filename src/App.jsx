
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [book, setBook] = useState({
    name: '',
    lendDate: '',
    returnDate: '',
    borrowerName: '',
    id: ''
  })
  const today = new Date().toISOString().split('T')[0];


  const [books, updateBooks] = useState(() => {
    const saved = localStorage.getItem("books")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books))
  }, [books])



  const handleDel = (e, id) => {
    const newB = books.filter((element) => {
      return element.id !== id
    })

    updateBooks(newB)
  }
  const handleNameChange = (e) => {
    setBook((prevBook) => ({
      ...prevBook,
      name: e.target.value,
    }));
    console.log(book)
  }

  const handleOnAdd = (e) => {
    e.preventDefault();
    // Validate form
    if (
      book.name.trim() === '' ||
      book.borrowerName.trim() === '' ||
      book.lendDate.trim() === '' ||
      book.returnDate.trim() === ''
    ) {
      alert('Please fill in all fields before adding the book.');
      return;
    }

    const newBook = { ...book, id: uuidv4() };
    console.log(newBook)
    updateBooks([...books, newBook])
    setBook({
      name: '',
      lendDate: '',
      returnDate: '',
      borrowerName: '',
      id: ''
    })


  }
  return (
    <>
      <div className="container mx-auto w-1/2  md:px-3 my-2">
      <div className='flex flex-col justify-center align-middle'>
        <div className="text-center text-"><span className="text-[#D9A299] font-extrabold text-5xl"><span className="text-[#DCC5B2] font-bold text-5xl">&lt;</span>LEND</span><spa6 className="text-[#DCC5B2] font-bold text-5xl">IT/&gt;</spa6></div>
        <p className='text-lg my-2 text-center text-[#DCC5B2]'>Your Personal Book Lending Log</p>
      </div>

        <div className="enter flex flex-col gap-5 my-3">
          <div className="flex flex-col ">
            <label htmlFor="bookName" className='px-2 my-0.5 text-sm text-[#D9A299] font-semibold'>Book Title: </label>
            <input required type="text" name="bookName" id="" className='bg-white md:w-full w-60 rounded-full py-0.5 border-[#DCC5B2]  border-2 px-3' value={book.name} onChange={(e) => { handleNameChange(e) }} />
          </div>
          <div className="enter2 flex md:flex-row flex-col gap-2">
            <div className="flex flex-col">
              <label htmlFor="borrowerName" className='px-2 my-0.5  text-sm text-[#D9A299] font-semibold'>Who are you lending it to?</label>
              <input required type="text" name="borrowerName" id="" className='bg-white rounded-full py-0.5 border-[#DCC5B2]  border-2 px-3 w-60' onChange={(e) => setBook({ ...book, borrowerName: e.target.value })} value={book.borrowerName} />

            </div>
            <div className="flex flex-col">
              <label htmlFor="" className='px-2 my-0.5 text-sm text-[#D9A299] font-semibold'>Date Lent Out: </label>
              <input required type="date" name="lendDate" id="" className='bg-white rounded-full py-0.5 border-[#DCC5B2]  border-2 px-2 md:w-45 w-60' onChange={(e) => setBook({ ...book, lendDate: e.target.value })} value={book.lendDate} />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className='px-2 my-0.5 text-sm text-[#D9A299] font-semibold'>Expected Return Date: </label>
              <input required type="date" name="returnDate" id="" className='bg-white rounded-full py-0.5 border-[#DCC5B2]  border-2 px-2 md:w-45 w-60' onChange={(e) => setBook({ ...book, returnDate: e.target.value })} value={book.returnDate} />
            </div>


          </div>
          <button className='bg-[#D9A299] w-28 py-2 rounded-full mx-auto cursor-pointer font-bold px-1' onClick={(e) => { handleOnAdd(e) }}> <i class="fa-solid fa-plus"></i> Add Book</button>
        </div>
      </div>
      <div className="tables flex md:flex-row flex-col justify-center  px-3 my-5 gap-3 mx-2">
        <div className='md:min-w-1/4 w-full md:px-7'>
          <div className="text text-xl text-[#D9A299] font-bold py-2">Books You've Lent: </div>
          {books.length===0&& <div className='text-[#DCC5B2] font-semibold'>No books added yet – start tracking now!</div>}
          {books.length !== 0 &&

            <table className="table-auto">
              <thead className='bg-[#DCC5B2]'>
                <tr>
                  <th className='px-2'>Book Name</th>
                  <th className='px-2'>Borrower's Name</th>
                  <th className='px-2'>Lending Date</th>
                  <th className='px-2'>Returning Date</th>
                </tr>
              </thead>
              <tbody>
                {books.map((item) => {
                  return <tr className='bg-white text-black' key={item.id}>
                    <td className='py-2 px-2 break-words whitespace-normal max-w-5 min-w-4 '>{item.name}</td>
                    <td className='px-2 break-words whitespace-normal max-w-5 min-w-4'>{item.borrowerName}</td>
                    <td className='px-2 break-words whitespace-normal max-w-5 min-w-4'>{item.lendDate}</td>
                    <td className='px-2 break-words whitespace-normal max-w-5 min-w-4'>{item.returnDate}</td>
                    <td className='bg-[#FAF7F3] px-2 '><button className='cursor-pointer' onClick={(e) => { handleDel(e, item.id) }}><i class="fa-solid fa-trash"></i></button></td>
                  </tr>


                })}

              </tbody>
            </table>
          }
          </div>
        <div className='md:min-w-1/4 w-full'>
          <div className="text text-xl text-[#D9A299] font-bold py-2">Books Expected Back Today: </div>

          {books.filter((i) => { return i.returnDate === today }).length == 0 && <div className='text-[#DCC5B2] font-semibold'>No books are due back today</div>}

          {books.filter((i) => { return i.returnDate === today }).length !== 0 &&
          <table className="table-auto w-full">
              <thead className='bg-[#DCC5B2]'>
                <tr>
                  <th className='px-2'>Book Name</th>
                  <th className='px-2'>Borrower's Name</th>
                  <th className='px-2'>Lending Date</th>
                  <th className='px-2'>Returning Date</th>
                </tr>
              </thead>
              <tbody>
                {books.filter((i)=>{return i.returnDate===today}).map((item) => {
                  return <tr className='bg-white text-black' key={item.id}>
                    <td className='py-2 px-2  break-words whitespace-normal min-w-4 max-w-5'>{item.name}</td>
                    <td className='px-2 break-words whitespace-normal min-w-4 max-w-5'>{item.borrowerName}</td>
                    <td className='px-2 break-words whitespace-normal min-w-4 max-w-5'>{item.lendDate}</td>
                    <td className='px-2 break-words whitespace-normal min-w-4 max-w-5'>{item.returnDate}</td>
                    <td className='bg-[#FAF7F3] px-2 '><button className='cursor-pointer' onClick={(e) => { handleDel(e, item.id) }}><i class="fa-solid fa-trash"></i></button></td>
                  </tr>


                })}

              </tbody>
            </table>
          }
        </div>

      
      </div>


      <div className="fixed bottom-0 left-0 w-full text-center text-[#DCC5B2] text-sm py-2  shadow-md z-50 font-semibold">Made with&#x1F9E1; by <span className='text-[#D9A299] font-bold'>Nasir</span></div>



    </>
  )
}

export default App
