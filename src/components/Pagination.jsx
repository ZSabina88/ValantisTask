import classes from "./Pagination.module.css";

export default function Pagination({ pages, prevClick, pageClick, nextClick, currentPage }) {
    return (
        <section className={classes.wrapper}>
            <span className={classes.paginateButton} onClick={prevClick}>Prev</span>
            {pages.map((page) => (
                <span
                    className={`${classes.paginateButton} ${currentPage === page ? classes.active : undefined}`}
                    key={page}
                    onClick={() => pageClick.call(null, page)}>
                    {page}
                </span>
            ))}
            <span className={classes.paginateButton} onClick={nextClick}>Next</span>
        </section>
    );
}