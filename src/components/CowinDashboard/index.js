// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

class CowinDashboard extends Component {
  state = {vaccinationList: {}, isLoading: true}

  componentDidMount() {
    this.getResponseData()
  }

  getFetchedData = fetchedData => ({
    vaccineDate: fetchedData.vaccine_date,
    dose1: fetchedData.dose_1,
    dose2: fetchedData.dose_2,
  })

  getFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="image"
      />
      <p>Something Went Wrong</p>
    </div>
  )

  getResponseData = async () => {
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const fetchedData = {
        dateWiseVaccine: data.last_7_days_vaccination.map(eachItem =>
          this.getFetchedData(eachItem),
        ),
        vaccineByAge: data.vaccination_by_age,
        vaccineByGender: data.vaccination_by_gender,
      }
      console.log(fetchedData.dateWiseVaccine)
      this.setState({vaccinationList: fetchedData, isLoading: false})
    } else {
      this.getFailure()
    }
  }

  renderVaccinationDetails = () => {
    const {vaccinationList} = this.state
    const {dateWiseVaccine} = vaccinationList
    return (
      <div>
        <h1>Vaccination Coverage</h1>
        {dateWiseVaccine.map(date => (
          <VaccinationCoverage dataList={date} />
        ))}
      </div>
    )
  }

  renderAgeWiseVaccine = () => {
    const {vaccinationList} = this.state
    const {vaccineByAge} = vaccinationList
    return (
      <div>
        <h1>Vaccination by Age</h1>
        {vaccineByAge.map(eachAge => (
          <VaccinationByAge listData={eachAge} />
        ))}
      </div>
    )
  }

  renderGenderWiseVaccine = () => {
    const {vaccinationList} = this.state
    const {vaccineByGender} = vaccinationList
    return (
      <div>
        <h1>Vaccination by Gender</h1>
        {vaccineByGender.map(gender => (
          <VaccinationByGender listData={gender} />
        ))}
      </div>
    )
  }

  renderSuccessView = () => (
    <>
      {this.renderVaccinationDetails()}
      {this.renderAgeWiseVaccine()}
      {this.renderGenderWiseVaccine()}
    </>
  )

  renderDivElements = () => {
    const {isLoading} = this.state
    return (
      <div>
        {isLoading ? (
          <div testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
          </div>
        ) : (
          this.renderSuccessView()
        )}
      </div>
    )
  }

  render() {
    return (
      <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="icon"
          />
          <h1>Co-win</h1>
        </div>
        <h1>CoWin Vaccination In India</h1>
        <div>{this.renderDivElements()}</div>
      </div>
    )
  }
}

export default CowinDashboard
