import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from './Dashboard';
import { vi } from 'vitest';

vi.mock('react-apexcharts', () => ({
    __esModule: true,
    default: () => <div>Mock Chart</div>,
}));

global.fetch = vi.fn(() =>
    Promise.resolve({
        text: () => Promise.resolve(
            'arrival_date_year,arrival_date_month,arrival_date_day_of_month,country,adults,children\n2023,01,01,USA,2,1'
        ),
    })
);

describe('Dashboard Component', () => {
    beforeEach(() => {
        render(<Dashboard />);
    });

    it('renders the dashboard title', () => {
        expect(screen.getByText('Hotel Booking Dashboard')).toBeInTheDocument();
    });

    it('renders start date and end date inputs', () => {
        expect(screen.getByLabelText(/Start Date:/)).toBeInTheDocument();
        expect(screen.getByLabelText(/End Date:/)).toBeInTheDocument();
    });

    it('renders filter button', () => {
        expect(screen.getByText('Filter')).toBeInTheDocument();
    });

    it('renders all chart sections', () => {
        expect(screen.getByText('Time Series Chart')).toBeInTheDocument();
        expect(screen.getByText('Country Chart')).toBeInTheDocument();
        expect(screen.getByText('Adult Sparkline')).toBeInTheDocument();
        expect(screen.getByText('Child Sparkline')).toBeInTheDocument();
    });
   
    it('does not show "No data found" message initially', () => {
        expect(screen.queryByText(/No data found for the selected date range/i)).toBeNull();
    });

});
