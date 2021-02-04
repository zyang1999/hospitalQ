import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, Image } from 'react-native';
import { globalStyles } from '../styles';
import { DangerButton, PrimaryButton, SecondaryButton } from "../components/Button";
import Modal from 'react-native-modal';
import api from '../services/Api';
import ErrorMessage from '../components/ErrorMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/Loading';

export default function AppointmentDetails({ navigation, route}) {

    const [isModalVisible, setModalVisible] = useState(false);
    const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);
    const [appointment, setAppointment] = useState(null);
    var reason = '';   
    const [doctor, setDoctor] = useState(null);
    const [patient, setPatient] = useState(null);

    useEffect(()=>{
        const getUserRole = async () =>{
            let userRole = await AsyncStorage.getItem('userRole');
            setUserRole(userRole);
            
        } 
        getUserRole();
        api.request('getAppointmentDetails', 'POST', {appointmentId: route.params.appointmentId}).then(response=>{
            setAppointment(response);
            setDoctor(response.doctor);
            setPatient(response.patient);
            setLoading(false);
        })        
    },[])

    const checkDate = (date) => {
        const today = new Date();

        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0, 0);
        
        const splittedDate = date.split('-');
        const day = splittedDate[0];
        const month = splittedDate[1] - 1;
        const year = splittedDate[2];

        const appointmentDate = new Date(year, month, day);
        if(appointmentDate.getTime() == today.getTime()){
            return 'today';
        }else if(appointmentDate.getTime() > today.getTime()){
            return 'future';
        }else{
            return 'past';
        }
    }

    const removeAppointment = (reason) => {
        setModalVisible(false);
        api.request('deleteAppointment', 'POST', { id: appointment.id, feedback: reason }).then(response => {
            if (response.success) {
                alert(response.message);
                navigation.navigate('ManageAppointment', { appointmentId: 'deleted' });
            } else {
                setError(response.message);
            }
        });
    }

    const completeAppointment = () =>{
        api.request('completeAppointment', 'POST', {id: appointment.id}).then(response =>{
            api.request('joinQueue', 'POST', {specialty: 'PHAMARCY'});
            if(response.success){
                alert(response.message);
                navigation.navigate(route.params.previousScreen, {appointmentId: appointment.id});
            }
        });
    }

    const submitFeedback = (feedback) => {
        api.request('storeAppointmentFeedback', 'POST', { appointmentId: appointment.id, feedback: feedback }).then(response => {
            if (response.success) {
                setIsFeedbackModalVisible(false);
                alert('Feedback submitted successfully');
                navigation.navigate('History', { refresh: appointment.id });
            } else {
                setError(response.message);
            }
        })
    }

    const FeedbackModal = () => {
        var feedback = '';
        return (
            <Modal
                isVisible={isFeedbackModalVisible}
            >
                <View style={styles.removeModal}>
                    <Text style={styles.details}>Please provide your feedback below.</Text>
                    <TextInput
                        multiline
                        numberOfLines={4}
                        style={styles.input}
                        onChangeText={text => feedback = text}
                    />
                    {error.feedback && <ErrorMessage message={error.feedback} />}
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{flex: 1, marginRight: 10}}>
                            <PrimaryButton title='SUBMIT' action={() => submitFeedback(feedback)} />
                        </View>
                        <View style={{flex: 1}}>
                            <DangerButton title='CANCEL' action={() => setIsFeedbackModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    const RemoveModal = () => (
        <Modal
            animationIn={'bounce'}
            animationInTiming={1000}
            isVisible={isModalVisible}>

            <View style={styles.removeModal}>
                {appointment.status == 'AVAILABLE'
                    ? <View>
                        <Text style={styles.details}>Are you sure you want to remove this appointment?</Text>
                    </View>
                    : <View>
                        <Text styles={globalStyles.h5}>There is a patient who already booked this appointment! Please provide your reason in order to remove this appointment.</Text>
                        <TextInput
                            multiline
                            numberOfLines={4}
                            style={styles.input}
                            onChangeText={text => reason = text}
                        />
                        {error.reason && <ErrorMessage message={error.reason} />}
                    </View>
                }
                <View style={styles.modalButton}>
                    <DangerButton title='CANCEL' action={() => removeAppointment(reason)} />
                    <SecondaryButton title='BACK' action={() => setModalVisible(false)} />
                </View>
            </View>
        </Modal>
    );

    const FeedbackButton = () => (
        <View style={{ flex: 1 }}>
            <PrimaryButton title='SUBMIT FEEDBACK' action={() => setIsFeedbackModalVisible(true)} />
        </View>
    )

    const Feedback = () => {
        if (appointment.feedback != null) {
            return (
                <View style={styles.card}>
                    <Text style={styles.title}>Feedback</Text>
                    <Text style={styles.details}>{appointment.feedback.feedback}</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.card}>
                    <Text style={styles.title}>Feedback</Text>
                    <Text>No Feedback</Text>
                </View>
            );
        }
    }

    const Reason = ({appointment}) =>(
        <View>
            <View style={styles.card}>
                <Text style={styles.title}>Cancel Reason</Text>
                <Text style={styles.details}>{appointment.feedback.feedback}</Text>
            </View>
            <Text style={{margin: 10}}>This appointment is cancelled.</Text>
        </View> 
    )

    const Button = () => {
        if(userRole == 'PATIENT'){
            if(appointment.status == 'COMPLETED'){
                return(
                    <View>
                        <Feedback />
                        {!appointment.feedback && <FeedbackButton/>}
                    </View>
                );        
            }else if (appointment.status == 'CANCELLED'){
                return (
                    <Reason appointment={appointment}/>
                );
            }else{
                return(<View></View>);
            }
        }else{
            if (appointment.status == 'CANCELLED') {
                return (
                    <Reason appointment={appointment}/>
                );
            } else {
                if (checkDate(appointment.date) == 'today') {
                    if(appointment.status == 'COMPLETED'){
                        return(
                            <Feedback />
                        );
                    }else{
                        return (
                            <View style={styles.button}>
                                <PrimaryButton title='COMPLETE' action={completeAppointment}/>                     
                            </View>
                        );
                    }               
                }else if(checkDate(appointment.date) == 'future'){
                    return(
                        <View style={styles.button}>
                            <DangerButton title='CANCEL' action={() => setModalVisible(true)} />
                        </View>
                    );
                } 
                else {
                    return (
                        <Text style={{margin: 10}}>This appointment can't be deleted because it was in the past.</Text>
                    );
                }
            }
        }
    }

    if(loading){
        return(<Loading />);
    }else{
        return (
            <ScrollView style={styles.scrollViewContainer}>
                <View style={{marginHorizontal: 5}}>
                    <RemoveModal />
                    <FeedbackModal/>
                    <View style={styles.card}>
                        <View>
                            <Image style={styles.image} source={{uri: doctor.selfie_string}}/>
                        </View>                    
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View>
                                <View>
                                    <Text style={styles.title}>Appointment Date</Text>
                                    <Text style={styles.details}>{appointment.date}</Text>
                                </View>
                                <View>
                                    <Text style={styles.title}>Doctor Name</Text>
                                    <Text style={styles.details}>DR. {doctor.first_name + ' ' + doctor.last_name}</Text>
                                </View>
                                <View>
                                    <Text style={styles.title}>Doctor email</Text>
                                    <Text style={styles.details}>{doctor.email}</Text>
                                </View>
                                <View>
                                    <Text style={styles.title}>Status</Text>
                                    <Text style={styles.details}>{appointment.status}</Text>
                                </View>
                            </View>
                            <View>
                                <View>
                                    <Text style={styles.title}>Appointment Time</Text>
                                    <Text style={styles.details}>{appointment.start_at + ' - ' + appointment.end_at}</Text>
                                </View>
                                <View>
                                    <Text style={styles.title}>Specialty</Text>
                                    <Text style={styles.details}>{appointment.specialty}</Text>
                                </View>
                                <View>
                                    <Text style={styles.title}>Telephone No</Text>
                                    <Text style={styles.details}>{doctor.telephone}</Text>
                                </View>                                                
                            </View>
                        </View>
                        {appointment.status != 'AVAILABLE' &&
                            <View>
                                <View style={{borderBottomWidth: 0.5, marginBottom: 10}}/>
                                <View>
                                <Image style={styles.image} source={{uri: patient.selfie_string}}/>
                            </View>  
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{marginRight: 35}}>    
                                        <View>
                                            <Text style={styles.title}>Patient Name</Text>
                                            <Text style={styles.details}>{patient.first_name + ' ' + patient.last_name}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.title}>Patient email</Text>
                                            <Text style={styles.details}>{patient.email}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.title}>Telephone No</Text>
                                            <Text style={styles.details}>{patient.telephone}</Text>
                                        </View>
                                    </View>  
                                    <View>
                                        <View>  
                                            <Text style={styles.title}>Gender</Text>
                                            <Text style={styles.details}>{patient.gender}</Text>
                                        </View>
                                        <View>  
                                            <Text style={styles.title}>patient IC</Text>
                                            <Text style={styles.details}>{patient.IC_no}</Text>
                                        </View>                           
                                    </View>   
                                </View> 
                            </View>
                        }                                                                  
                    </View>  
                    <Button /> 
                </View>       
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        elevation: 4,
        backgroundColor: 'white',
        marginVertical: 10,
        borderRadius: 10,
        padding: 20,
    },
    title: {
        fontFamily: 'RobotoBold',
        marginBottom: 10,
        fontSize: 15
    },
    details: {
        fontSize: 15,
        marginBottom: 10
    },
    button: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    removeModal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalButton: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        textAlignVertical: "top",
        padding: 10
    },
    image: {
        marginBottom: 10,
        height: 100,
        width: 100,
        borderRadius: 100,
        alignSelf: 'center'
    },
    scrollViewContainer: {
        backgroundColor: 'white',
        padding: 5
    },
});