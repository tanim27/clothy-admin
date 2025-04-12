import { useFormik } from 'formik'
import { createContext } from 'react'

const FormikContext = createContext({})

export function Formik({ children, ...props }) {
	const formikStateAndHelpers = useFormik(props)

	return (
		<FormikContext.Provider value={formikStateAndHelpers}>
			{typeof children === 'function'
				? children(formikStateAndHelpers)
				: children}
		</FormikContext.Provider>
	)
}
