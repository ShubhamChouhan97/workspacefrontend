import {
	Button, Form, Input, InputNumber, message, Image, Checkbox,
} from 'antd';
import React, {
    useCallback, useRef, useState, useEffect,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import style from './twofa.module.css';
import { AppState, useAppStore } from '../../../stores';
import { AuthModal } from '../../../components/authModal';

const appStoreSelector = (state: AppState) => ({
	otpRequest: state.otp,
});

// export const TwoFa:React.FunctionComponent = () => {
// 	// const history = useHistory();
// 	const { otpRequest } = useAppStore(appStoreSelector);
// 	const [loading, setLoading] = useState<boolean>(false);

//     const handleOtpFormSubmit = useCallback(async (value: any) => {
//         setLoading(true);
//         try {
//             console.log('value', value);
//             await otpRequest(value);
//         } catch (error:any) {
//             // if (error?.message === '2FA') {
//             //     // ✅ Corrected navigation
//             //     history.push('/2fa');
//             //     } else {
//             //         message.error(error?.message ?? 'An error occurred');
//             //     }
//             console.log(error);
//             message.error(error?.message ?? 'An error occurred');
//         } finally {
//             setLoading(false);
//         }

//         console.log(value);
//     }, [otpRequest]);

// 	return (
// 		<AuthModal title="Enter OTP">
// 			<>
// 				<Form
// 					layout="vertical"
// 					onFinish={handleOtpFormSubmit}
// 					className={style.formOnly}
// 				>
//                 <Form.Item
//                 label="OTP"
//                 name="OTP"
//                 rules={[{
//                 required: true,
//                 message: 'Please enter OTP!',
//                 },
//                 ]}
//                 >
//                 <InputNumber placeholder="Enter OTP" style={{ width: '100%' }} />
//                 </Form.Item>
// 					<Form.Item>
// 						<div className={style.actionButton}>
// 							<Button
// 								type="primary"
// 								size="large"
// 								htmlType="submit"
// 								loading={loading}
// 								className={style.loginButton}
// 							>
// 								Submit
// 							</Button>
// 						</div>
// 					</Form.Item>
// 				</Form>
// 			</>
// 		</AuthModal>
// 	);
// };
export const TwoFa = () => {
	const { otpRequest } = useAppStore(appStoreSelector);
	const [loading, setLoading] = useState(false);
	const [showResend, setShowResend] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowResend(true);
		}, 5000);
		return () => clearTimeout(timer);
	}, []);

	const handleOtpFormSubmit = useCallback(async (value) => {
		setLoading(true);
		try {
			await otpRequest(value);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}, [otpRequest]);

	const handleResendOtp = () => {
		console.log('hi');
	};

	return (
		<AuthModal title="Enter OTP">
			<Form
				layout="vertical"
				onFinish={handleOtpFormSubmit}
				className={style.formOnly}
			>
				<Form.Item
					label="OTP"
					name="OTP"
					rules={[{ required: true, message: 'Please enter OTP!' }]}
				>
					<InputNumber placeholder="Enter OTP" style={{ width: '100%' }} />
				</Form.Item>
				<Form.Item>
					<div className={style.actionButton}>
						<Button
							type="primary"
							size="large"
							htmlType="submit"
							loading={loading}
							className={style.loginButton}
						>
							Submit
						</Button>

						{showResend && (
                        <div>
                             {/* <p>Didn&apos;t receive OTP?</p> */}
                            <Button
								type="primary"
								size="large"
								onClick={handleResendOtp}
								className={style.loginButton}
                            >
							Re-send OTP
                            </Button>
                        </div>
						)}
					</div>
                    {showResend && (
                        <div className={style.actionButton}>
                             <p>Didn&apos;t receive OTP?</p>
                        </div>
						)}
				</Form.Item>
			</Form>
		</AuthModal>
	);
};
