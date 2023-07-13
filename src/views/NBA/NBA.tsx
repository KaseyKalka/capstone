import DateBox from '../../components/DateBox/DateBox'
import Nav from '../../components/Nav/Nav'
import SportEvent from '../../components/SportEvent/SportEvent'

const NBA = () => {
  let sport_id = 4; 
    
  return (
    <>
        <Nav/>
        <DateBox/>
        <SportEvent/>
    </>
  )
}

export default NBA