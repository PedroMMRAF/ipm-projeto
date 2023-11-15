export default function NavDropdownColumn({ children, className, ...params }) {
    return (
        <div className={`dropdown-col ${className}`} {...params}>
            {children}
        </div>
    )
}