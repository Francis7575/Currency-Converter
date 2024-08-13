import Logo from "../assets/Logo.svg"

const Header = () => {
  return (
    <header className="flex gap-4 items-center">
      <img src={Logo} alt="XchangeCurrency Logo" />
      <h1 className="text-[1.2rem] text-dark-blue font-semibold"
          style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
        Best Currency Converter
      </h1>
    </header>
  )
}

export default Header