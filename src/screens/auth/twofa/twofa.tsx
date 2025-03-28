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
	resendOtp: state.resendOtp,
});

export const TwoFa = () => {
	const { otpRequest, resendOtp } = useAppStore(appStoreSelector);
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
			const data = await otpRequest(value);
			console.log('resp:', data.error);
			if (data.error) {
				message.error('Invalid OTP');
			}
		} catch (error) {
			console.log(error);
			let errorMessage = 'An error occurred';
            if (typeof error === 'string') {
            errorMessage = error;
            } else if (error instanceof Error) {
            errorMessage = error.message;
            }
            message.error(errorMessage);
		} finally {
			setLoading(false);
		}
	}, [otpRequest]);

	// const handleResendOtp = () => {
	// 	console.log('hi');
	// };

	const handleResendOtp = useCallback(async () => {
		setLoading(true);
		try {
			const data = await resendOtp();
			console.log('resp:', data.error);
			if (data.error) {
				message.error('Invalid OTP');
			}
		} catch (error) {
			console.log(error);
			let errorMessage = 'An error occurred';
            if (typeof error === 'string') {
            errorMessage = error;
            } else if (error instanceof Error) {
            errorMessage = error.message;
            }
            message.error(errorMessage);
		} finally {
			setLoading(false);
		}
	}, [resendOtp]);

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
