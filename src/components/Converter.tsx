import { useState } from 'react'
import Header from './Header'
import RatingForm from './RatingForm';

const Converter = () => {
  const [startCurrency, setStartCurrency] = useState<string>('CHF');
  const [endCurrency, setEndCurrency] = useState<string>('AUD');
  const [resultAmount, setResultAmount] = useState<number | string | null>(null)
  const [amountInput, setAmountInput] = useState<number>(100);

  const apiKey = import.meta.env.VITE_REACT_API_KEY
  const apiUrl = import.meta.env.VITE_REACT_API_URL

  const handleConvert = async () => {
    try {
      const url = `${apiUrl}have=${endCurrency}&want=${startCurrency}&amount=${amountInput}`;
      const response = await fetch(url, {
        headers: {
          'X-API-KEY': apiKey,
        },
      });
      const data = await response.json();
      console.log(data)
      if (data.new_amount) {
        setResultAmount(data.new_amount);
      }
    } catch (error) {
      console.error("Request Failed:", error);
      setResultAmount("An error occurred. Please try again later.");
    }
  };

  return (
    <div className='flex flex-col items-center mt-8'>
      <Header />
      <main className='mt-6 max-w-[300px] w-full md:max-w-[400px]'>
        <div className='flex items-center justify-center gap-6 pl-3'>
          <select value={startCurrency} onChange={(e) => setStartCurrency(e.target.value)}
            className='bg-dark-blue cursor-pointer text-white px-3 rounded-[12px] py-1'>
            {/* Swiss Franc */}
            <option value="CHF">CHF</option>
            {/* <!-- Australian Dollar --> */}
            <option value="AUD">AUD</option>
            {/* Polish Złoty  */}
            <option value="PLN">PLN</option>
            {/* New Zealand Dollar */}
            <option value="NZD">NZD</option>
            {/* Hong Kong Dollar */}
            <option value="HKD">HKD</option>
            {/* Danish Krone */}
            <option value="DKK">DKK</option>
            {/* South Korean Won */}
            <option value="KRW">KRW</option>
            {/* Turkish Lira */}
            <option value="TRY">TRY</option>
            {/* Chinese Yuan */}
            <option value="CNY">CNY</option>
          </select>

          <svg xmlns="http://www.w3.org/2000/svg" height="40" width="20" viewBox="0 0 512 512">
            <path fill="#1e1772" d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" />
          </svg>

          <select value={endCurrency} onChange={(e) => setEndCurrency(e.target.value)}
            className='bg-dark-blue text-white cursor-pointer px-3 rounded-[12px] py-1'>
            <option value="AUD">AUD</option>
            <option value="CHF">CHF</option>
            <option value="PLN">PLN</option>
            <option value="NZD">NZD</option>
            <option value="HKD">HKD</option>
            <option value="DKK">DKK</option>
            <option value="KRW">KRW</option>
            <option value="TRY">TRY</option>
            <option value="CNY">CNY</option>
          </select>
        </div>

        <div className='flex flex-col gap-1 mt-6 pl-3'>
          <label htmlFor="amount" className='text-gray'>Amount</label>
          <input className='py-2 pl-3 bg-dark-blue rounded-[12px] text-white outline-none'
            type="number"
            id="amount"
            name='amount'
            placeholder="100"
            value={amountInput}
            onChange={(e) => setAmountInput(parseInt(e.target.value))}
            required
          />
          <div className='flex justify-center mt-4'>
            <button onClick={handleConvert}
              className='w-full text-center rounded-[1.25rem] py-1 bg-white border border-dark-blue text-dark-blue max-w-[90px] convert-btn'>
              Convert
            </button>
          </div>
        </div>

        <div className='flex justify-center mt-3 pl-3'>
          {resultAmount && <span className='text-dark-blue font-bold'>
            {amountInput} {startCurrency} = {resultAmount} {endCurrency}
          </span>}
        </div>
        <RatingForm />
      </main>
    </div>
  )
}

export default Converter