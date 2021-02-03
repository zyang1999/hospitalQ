import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, Image } from 'react-native';
import { globalStyles } from '../styles';
import { DangerButton, PrimaryButton, SecondaryButton } from "../components/Button";
import Modal from 'react-native-modal';
import api from '../services/Api';
import ErrorMessage from '../components/ErrorMessage';

export default function AppointmentDetails({ navigation, route }) {

    const appointment = route.params.appointmentDetails;
    const patient = appointment.patient;
    const [isModalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState([]);
    var reason = '';

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

    const Feedback = () => (
        <View style={styles.card}>
            <Text style={styles.title}>Feedback</Text>
            {appointment.feedback
                ?<Text>{appointment.feedback.feedback}</Text>
                :<Text>No Feedback</Text>
            }
        </View>
    )

    const Button = () => {
        if (appointment.status == 'CANCELLED') {
            return (
                <Text style={{margin: 10}}>This appointment is cancelled.</Text>
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

    return (
        <ScrollView style={styles.scrollViewContainer}>
            <View style={{marginHorizontal: 5}}>
                <RemoveModal />
                <View style={styles.card}>
                    {patient && 
                    <View>
                        <Image style={styles.image} source={{uri: patient.selfie_string}}/>
                    </View> 
                    }                     
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <View>
                                <Text style={styles.title}>Appointment Date</Text>
                                <Text style={styles.details}>{appointment.date}</Text>
                            </View>
                            <View>
                                <Text style={styles.title}>Specialty</Text>
                                <Text style={styles.details}>{appointment.specialty}</Text>
                            </View>
                            {appointment.status != 'AVAILABLE' &&
                                <View>   
                                    <View>
                                        <Text style={styles.title}>Patient</Text>
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
                            }
                        </View>
                        <View>
                            <View>
                                <Text style={styles.title}>Appointment Time</Text>
                                <Text style={styles.details}>{appointment.start_at + ' - ' + appointment.end_at}</Text>
                            </View>
                            <View>
                                <Text style={styles.title}>Status</Text>
                                <Text style={styles.details}>{appointment.status}</Text>
                            </View>
                            {appointment.status != 'AVAILABLE' &&
                                <View>
                                    <View>  
                                        <Text style={styles.title}>Gender</Text>
                                        <Text style={styles.details}>{patient.gender}</Text>
                                    </View>
                                    <View>  
                                        <Text style={styles.title}>Patient IC</Text>
                                        <Text style={styles.details}>{patient.IC_no}</Text>
                                    </View>                           
                                </View>        
                            }                                                 
                        </View>
                    </View>   
                    <View>
                        {appointment.status == 'CANCELLED' &&
                            <View>
                                <Text style={styles.title}>Cancelled Reason</Text>
                                <Text style={styles.details}>{appointment.reason.reason}</Text>
                            </View>
                        } 
                    </View>                                                                   
                </View>  
                <Button /> 
            </View>       
        </ScrollView>
    );
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
    }
});