import { React, useEffect, useRef, useContext} from 'react'
import { useQuery,useMutation , gql} from "@apollo/client";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBRow,
    MDBInput,
}from 'mdb-react-ui-kit';
import accountContext from '../context/accountContext';



export default function VitalSigns() {
    //Hooks
    const  patientIdRef= useRef();
    const  bodyTempRef= useRef();
    const   heartRateRef= useRef();
    const   bloodPressRef= useRef();
    const   respRateRef = useRef();

    const {userId} = useContext(accountContext)
    //gql
  const addVitalSigns = gql`
  mutation addForm(
    $patientId: String!,
    $bodyTemp: String!,
    $heartRate: String!,
    $bloodPress: String!,
    $respRate: String!
  ) {
    addForm(
      patientId: $patientId,
      bodyTemp: $bodyTemp,
      heartRate: $heartRate,
      bloodPress: $bloodPress,
      respRate: $respRate
    ) {
      patientId
      heartRate
      bodyTemp
      bloodPress
      respRate
    }
  }
`;


  const [createVitalSigns, { loading, error, data }] = useMutation(addVitalSigns,{
    //refetchQueries: [{ query: courses }]
  });
    

    //Callbacks
    const onSubmit = ()=>{
      
        createVitalSigns({
            variables: {
                patientId:userId,
                bodyTemp: bodyTempRef.current.value,
                heartRate: heartRateRef.current.value,
                bloodPress: bloodPressRef.current.value,
                respRate: respRateRef.current.value     
            },
          });
        console.log("Data", data)
    }

    //Use Effect
    useEffect(()=>{
        console.log("User Id", userId)
    })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :{JSON.stringify(error)}</p>;

    return (
        <MDBContainer fluid style={{ overflow: "auto" }}>

            <div className="p-5 bg-image" style={{ backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px' }}></div>

            <MDBCard className=' p-5 shadow-5' style={{ width: '50%', marginTop: '-100px', marginLeft: 'auto', marginRight: 'auto', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)' }}>
                <MDBCardBody className='p-5 text-center'>

                    <h2 className="fw-bold mb-5"> Vital Signs</h2>

                    <MDBRow>
                        <MDBCol col='11' >
                            <MDBInput ref={bodyTempRef} label='Body Temp' id='code' type='number' />
                        </MDBCol>
                        <MDBCol lg='1' className="text-left">
                            <label htmlFor="code">°C</label>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>

                        <MDBCol col='11' >
                            <MDBInput ref={heartRateRef} wrapperClass='mb-4' label='Heart Rate' id='code' type='number' />
                        </MDBCol>
                        <MDBCol lg='1' className="text-left">
                            <label htmlFor="code">bpm</label>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>

                        <MDBCol col='11' >
                            <MDBInput ref={bloodPressRef} wrapperClass='mb-4' label='Blood Pressure' id='code' type='number' />
                        </MDBCol>
                        <MDBCol lg='1' className="text-left">
                            <label htmlFor="code">mmHg</label>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>

                        <MDBCol col='6' >
                            <MDBInput ref={respRateRef} wrapperClass='mb-4' label='Respiratory Rate' id='code' type='number' />
                        </MDBCol>
                        <MDBCol lg='1' className="text-left">
                            <label htmlFor="code">bpm</label>
                        </MDBCol>


                    </MDBRow>

                    <MDBBtn className='w-100 mb-4' size='md' onClick={()=>{onSubmit()}}> Submit</MDBBtn>




                </MDBCardBody>




            </MDBCard>

        </MDBContainer>
    )
}
