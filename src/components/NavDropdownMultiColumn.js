import NavDropdown from 'react-bootstrap/NavDropdown'

export default function NavDropdownMultiColumn({ children, ...params }) {
    return (
        <NavDropdown {...params}>
            <div className="dropdown-multicol">
                {children}
            </div>
        </NavDropdown>
    )
}