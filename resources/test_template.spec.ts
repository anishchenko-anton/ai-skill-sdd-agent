import { TestBed } from '@angular/core/testing';
import { ExampleService } from './example.service';
import { ExampleApiClient } from './example-api.client';
import { of, throwError } from 'rxjs';

describe('ExampleService (SDD Unit Tests)', () => {
  let service: ExampleService;
  let apiClientSpy: jasmine.SpyObj<ExampleApiClient>;

  const mockItem = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Test Item',
    status: 'active',
  };

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ExampleApiClient', ['getItemById', 'createItem']);

    TestBed.configureTestingModule({
      providers: [
        ExampleService,
        { provide: ExampleApiClient, useValue: spy },
      ],
    });

    service = TestBed.inject(ExampleService);
    apiClientSpy = TestBed.inject(ExampleApiClient) as jasmine.SpyObj<ExampleApiClient>;
  });

  describe('Happy Path Execution', () => {
    it('should load item by ID and update reactive state', (done) => {
      // Arrange (Given)
      apiClientSpy.getItemById.and.returnValue(of(mockItem));

      // Act (When)
      service.loadItem(mockItem.id).subscribe((result) => {
        // Assert (Then)
        expect(result).toEqual(mockItem);
        expect(apiClientSpy.getItemById).toHaveBeenCalledWith(mockItem.id);
        expect(service.currentItem()).toEqual(mockItem);
        done();
      });
    });
  });

  describe('Edge Conditions & Error Scenarios', () => {
    it('should handle 404 error and set reactive error state', (done) => {
      // Arrange (Given)
      const errorResponse = { status: 404, message: 'Item not found' };
      apiClientSpy.getItemById.and.returnValue(throwError(() => errorResponse));

      // Act (When)
      service.loadItem('non-existent-id').subscribe({
        error: (err) => {
          // Assert (Then)
          expect(err.status).toBe(404);
          expect(service.errorMessage()).toBe('Item not found');
          done();
        },
      });
    });
  });
});
